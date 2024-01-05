import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { payment } from 'src/app/model/feedback';
declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  createPayment(amount: number, firstName: string, lastName: string, userId: string): void {
    const options = {
      key: 'rzp_test_SjV1e91e6tjlz9',
      amount: amount,
      name: `${firstName} ${lastName}`,
      description: `Payment for Course`,
      image: 'your-logo-url',
      handler: (response: any) => {
        // Handle successful payment response
        console.log(response,"aaaaaaaaaaaaaaaaaa");

        // Make HTTP POST request to the backend
        this.postToBackend(userId);
      },
      prefill: {
        name: `${firstName} ${lastName}`,
        email: 'user-email@example.com',
        contact: 'user-phone-number',
      },
      // notes: {
      //   review: review,
      // },
      theme: {
        color: '#F37254',
      },
    };
    
    console.log('Razorpay Options:', options);
    
    const rzp = new Razorpay(options);
    rzp.open();
  }

  private postToBackend( userId: string): void {
 let id=userId

console.log(id,"id");

    this.http.get<any>(`/user/appointment/${id}`, { withCredentials: true }).subscribe(
      (response: any) => {
        // Handle the backend response if needed
        console.log('Backend Response:', response);
      },
      (error) => {
        // Handle error if the HTTP request fails
        console.error('HTTP POST Error:', error);
      }
    );
  }
}
