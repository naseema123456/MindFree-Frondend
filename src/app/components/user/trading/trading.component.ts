import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TradingRecord } from 'src/app/model/trading';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css']
})
export class TradingComponent  implements OnInit {
  stockForm!: FormGroup;
  showMiddleItemsButton: boolean = false;
  previousStockName!: string;
  previousAtThePrice!: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.stockForm = this.fb.group({
      tradeType: ['', Validators.required],
      stockName: ['', Validators.required],
      atThePrice: [null, Validators.required],
      quantity: [null],
      stopLoss: [null],
      target: [null],
      more: [''],
      usedCapital: [null],
    });
  }

  isOptionSelling(): boolean {
    const tradeTypeControl = this.stockForm.get('tradeType');
  
    // Check if tradeTypeControl is not null before accessing its value
    return tradeTypeControl !== null && tradeTypeControl.value === 'optionselling';
  }
  
  submitForm() {
    if (this.stockForm.valid) {
      const formData = this.stockForm.value;
      console.log(formData);
      
      this.http.post<TradingRecord>('/callprovider/trade', formData, { withCredentials: true }).subscribe(
        (response:TradingRecord) => {
          console.log(response,"............");
         let Id=response.id
    
         Swal.fire('Success','Saved','success')
        },
        (err) => {
          console.log(err);
          Swal.fire('Error', err.error.message, 'error');
        }
      );
     
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
}