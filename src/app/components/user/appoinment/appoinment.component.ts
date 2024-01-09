import { Component, OnInit } from '@angular/core';
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
export class AppoinmentComponent implements OnInit {
  response!: IApiAppointment;
  public showModal: boolean = false;
  callProviders: {
    firstName: string;
    lastName: string;
    callproviderId:string;
    amountOfCourse: number;
    rating: number;
    review: string;
    userId: string;
  }[] = [];
  constructor(
    private razorpayService: RazorpayService,
    private http: HttpClient,
    private router: Router,
  ){}

  ngOnInit(): void {
 
  // this.http.get<any>('/callprovider/getcallprovider', { withCredentials: true }).subscribe(
  //   (data) => {
  //     console.log(data, "............");
      

  //   }
  // );
      
  this.http.get<IApiAppointment>('/callprovider/getcallprovider', { withCredentials: true }).subscribe(
    (response: IApiAppointment) => {
      if (response.success) {
        // Update callProviders array using the response data
        this.callProviders = response.data.map((provider: any) => ({
          firstName: provider.callprovider.firstName,
          callproviderId:provider.callprovider._id,
          lastName: provider.callprovider.lastName,
          amountOfCourse: provider.amount,
          rating: 4.5, // Add any default values or adjust as needed
          review: 'Great experience!', // Add any default values or adjust as needed
          userId: provider.userId
        }));
  
        console.log(this.callProviders, 'callProviders');
      } else {
        console.error('Error loading users:', response.message);
      }
    },
    (error) => {
      console.error(error); // Log any errors
    }
  );
  

  }
  time(userId:string|undefined){
    console.log(userId,"userId");
    
    this.http.get<IApiAppointment>(`/user/getTime/${userId}`, { withCredentials: true }).subscribe(
      (response: IApiAppointment) => {
        this.showModal=true
        if (response.success) {
          this.response = response;
          console.log(this.response,"respons");
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
  
    const paymentAmount = 1000* 100; 
   const response= this.razorpayService.createPayment(paymentAmount, callprovider,time);

 
   
  }
}
