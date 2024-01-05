import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Feedback } from 'src/app/model/feedback';
import { RazorpayService } from 'src/app/razorpay.service';
import { IApiAppointment,Appointment } from 'src/app/model/appoinment';


@Component({
  selector: 'app-appoinment',
  templateUrl: './appoinment.component.html',
  styleUrls: ['./appoinment.component.css']
})
export class AppoinmentComponent {
  response!: IApiAppointment;
  public showModal: boolean = false;
  constructor(
    private razorpayService: RazorpayService,
    private http: HttpClient,
    private router: Router,
  ){}
  callProviders = [
    { firstName: 'John', lastName: 'Doe', amountOfCourse: 1000, rating: 4.5, review: 'Great experience!' },
    { firstName: 'John', lastName: 'Doe', amountOfCourse: 1000, rating: 4.5, review: 'Great experience!' },
    { firstName: 'callprovider', lastName: 'user1', amountOfCourse: 1000, rating: 4.5, review: 'Great experience!' ,userId:"6597b3e575f0345c03a22d9c"},
    // Add more call providers as needed
  ];


  time(userId:string|undefined){
    console.log(userId,"userId");
    
    this.http.get<IApiAppointment>(`/user/getTime/${userId}`, { withCredentials: true }).subscribe(
      (response: IApiAppointment) => {
        this.showModal=true
        if (response.success) {
          this.response = response;
          console.log(this.response);
        } else {
          console.error('Error loading users:', response.message);
        }
      
      },
      (error) => {
        // Handle error if the HTTP request fails
        console.error('HTTP POST Error:', error);
      }
    );

  }
  closeModal(){

    this.showModal=false
  }
  openRazorpayModal(callprovider:string,time:string) {
  console.log("hi");
  this.showModal=false
  console.log(callprovider,time);
  
  //   const paymentAmount = provider.amountOfCourse * 100; 
  //  const response= this.razorpayService.createPayment(paymentAmount, provider.firstName, provider.lastName, provider.userId);

    // this.http.post<Feedback>('/user/appoinment', response, { withCredentials: true }).subscribe(
    //   (response:Feedback) => {
     
    //     console.log(response,"............");
   
    //     // this.router.navigate(['/user/home']);
    //   },
    //   (err) => {
    //     Swal.fire("Error", err.error.message, "error");
    //   }
    // );
   
  }
}
