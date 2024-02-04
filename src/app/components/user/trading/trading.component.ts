import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TradingRecord } from '../../../model/trading';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css']
})
export class TradingComponent implements OnDestroy{
  isSubmitted = false;
  private subscriptions: Subscription = new Subscription();
  stockForm!: FormGroup;
  showMiddleItemsButton: boolean = false;
  previousStockName!: string;
  previousAtThePrice!: number;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
    ) {
      this.stockForm = this.formBuilder.group({
        tradeType: ['holding', Validators.required],
        usedCapital: [null],
        stockName: ['', Validators.required],
        atThePrice: [null, [Validators.required, Validators.min(1)]],
        quantity: [null],
        stopLoss: [null, [Validators.required, Validators.min(1)]],
        target: [null, [Validators.required, Validators.min(0)]],
        more: ['']
      }, {  validators: this.customValidator.bind(this)});
      
    }
    customValidator(group: FormGroup) {
      const stopLoss = group.get('stopLoss')!.value;
      const target = group.get('target')!.value;
      const atThePrice = group.get('atThePrice')!.value;
    
      console.log('stopLoss:', stopLoss);
      console.log('target:', target);
      console.log('atThePrice:', atThePrice);
    
      if (stopLoss != null && target != null && atThePrice != null) {
        if (stopLoss >= atThePrice) {
          console.log('Invalid Stop Loss');
          group.get('stopLoss')!.setErrors({ invalidStopLoss: true });
        } else {
          group.get('stopLoss')!.setErrors(null);
        }
    
        if (target <= atThePrice) {
          console.log('Invalid Target');
          group.get('target')!.setErrors({ invalidtarget: true });

        } else {
          group.get('target')!.setErrors(null);
        }
      }
    
      return null;
    }
    
 
  isFormValid(): boolean {
    return this.stockForm.valid;
  }

  isOptionSelling(): boolean {
    const tradeTypeControl = this.stockForm.get('tradeType');
  
    // Check if tradeTypeControl is not null before accessing its value
    return tradeTypeControl !== null && tradeTypeControl.value === 'optionselling';
  }
  
  submitForm() {
    this.isSubmitted = true;
    if (this.stockForm.valid) {
      const formData = this.stockForm.value;
      console.log(formData);
      
      this.http.post<TradingRecord>('/callprovider/trade', formData, { withCredentials: true }).subscribe({
        next: (response: TradingRecord) => {
          console.log(response, "............");
          let Id = response.id;
      
          Swal.fire('Success', 'Saved', 'success');
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Error', err.error.message, 'error');
        },
        complete: () => {
    
          console.log('Request completed');
        }
      });
      
     
    } else {
      // Handle invalid form
      console.log('Form is invalid');
    }
  }


  onTradeTypeChange() {
    console.log('onTradeTypeChange called');
    this.showMiddleItemsButton = this.isOptionSelling() && this.areAtThePricesValid();
  }
  areAtThePricesValid(): boolean {
    console.log('atThePricesValid called');
    // Implement your logic to check if the sum of "At The Price" values is not above "Used Capital"
    const atThePrice = this.stockForm.get('atThePrice')!.value || 0;
    const usedCapital = this.stockForm.get('usedCapital')!.value || 0;
    const sumOfAtThePrices = atThePrice + this.getSumOfPreviousAtThePrices();
    console.log('atThePrice:', atThePrice);
    console.log('usedCapital:', usedCapital);
    console.log('sumOfAtThePrices:', sumOfAtThePrices);
    return sumOfAtThePrices <= usedCapital;
  }

  getSumOfPreviousAtThePrices(): number {
    // Implement your logic to calculate the sum of previous "At The Price" values
    // You need to store the previous values when the user clicks the "Add Items" button
    return this.previousAtThePrice || 0;
  }

  addMiddleItems() {
    // Save previous values
    this.previousStockName = this.stockForm.get('stockName')!.value;
    this.previousAtThePrice = this.stockForm.get('atThePrice')!.value;

    // Additional logic as needed...

    // Update button visibility
    this.showMiddleItemsButton = this.isOptionSelling() && this.areAtThePricesValid();
    this.cdr.detectChanges();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}


