import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TradingRecord } from 'src/app/model/trading';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css']
})
export class TradingComponent  implements OnInit {
  stockForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.stockForm = this.fb.group({
      tradeType: ['', Validators.required],
      stockName: ['', Validators.required],
      atThePrice: [null], // assuming this can be optional
      quantity: [null],
      stoploss: [null],
      target: [null],
      more: ['', Validators.required],
    });
  }
  submitForm() {
    if (this.stockForm.valid) {
      const formData = this.stockForm.value;
      console.log(formData);
      this.http.post<TradingRecord>('/callprovider/register', formData, { withCredentials: true }).subscribe(
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
}