import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { otpverify } from 'src/app/model/usermodel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})


export class OtpverificationComponent implements OnInit {
  otp: string = '';
  isVerified: boolean = false;
  userId: string | undefined; 
  
  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
    ) {}


  ngOnInit() {
    // Retrieve the user ID from the query parameters
    this.route.queryParams.subscribe(params => {
      this.userId = params['id']; 
      // Use the userId as needed
    });
  }
 
  verifyOTP() {
    let otp = this.otp;
    let id = this.userId; 
  
    
    // Check if the entered OTP is valid (you can replace this with your actual OTP verification logic)
    this.http.post<otpverify>('/user/verify-otp',{ otp,id },  { withCredentials: true }).subscribe(
      (response:otpverify) => {
     if(response){
      console.log(response, 'response from verify otp');
      
        if(response.success==true){
            Swal.fire({
                title: 'Success!',
                text: 'OTP Verified Successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
              });
              this.router.navigate(['/user/home']);
        } else {
            Swal.fire({
              title: 'Error!',
              text: 'Invalid OTP. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
      }}
    },
    (err: any) => {
      console.log(err);
      Swal.fire('Error', err.error.message, 'error');
  }
    )}}