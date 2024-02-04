import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { otpverify, IApiUserRes } from '../../../model/usermodel';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})
export class OtpverificationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  otp: string = '';
  isVerified: boolean = false;
  userId: string | undefined;
  resendInProgress: boolean = false;
  countdown: number = 180; // Initialize countdown to 3 minutes
  countdownInterval: number | undefined;;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initializeComponent();

  }
  initializeComponent(): void {
    // Retrieve the user ID from the query parameters
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      // Use the userId as needed
    });

    // Start the countdown when the component is initialized
    this.startResendCountdown();
  }
  verifyOTP() {
    const otp = this.otp;
    const id = this.userId;
    this.isVerified = true;


    // Check if the entered OTP is valid (replace this with your actual OTP verification logic)
    this.http.post<otpverify>('/user/verify-otp', { otp, id }, { withCredentials: true }).subscribe({
      next: (response: otpverify) => {
        console.log(response, 'response from verify otp');
        if (response.success) {
          clearInterval(this.countdownInterval);
          Swal.fire({
            title: 'Success!',
            text: 'OTP Verified Successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.router.navigate(['/user/login']);
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Invalid OTP. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          this.isVerified = false;
          this.router.navigate(['/user/otpverification']);
        }
      },
      error: (err: Error) => {
        console.log(err);
        Swal.fire('Error', err.message, 'error');
      },
      complete: () => {
        // Optional: Code to run when the observable completes.
        console.log('Completed OTP verification request');
      }
    });

  }

  resendOTP(): void {
    console.log("resend");

    const id = this.userId;
    console.log(this.userId);
    this.http.get<IApiUserRes>(`/user/resendotp/${id}`, { withCredentials: true }).subscribe(
      (response: IApiUserRes) => {
        console.log(response, "............");
        this.initializeComponent();
      },)
  }
  startResendCountdown(): void {

    clearInterval(this.countdownInterval);

    // Start a countdown interval, updating every second
    this.countdown = 120; // Reset countdown to 3 minutes
    this.countdownInterval = window.setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        // Stop the countdown when it reaches 0
        clearInterval(this.countdownInterval);
        // Show Resend OTP option after 3 minutes
        this.resendInProgress = false;
      } else if (this.countdown <= 150) {
        // Show Resend OTP option after 2 minutes and 30 seconds
        this.resendInProgress = true;
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    clearInterval(this.countdownInterval);
    this.subscriptions.unsubscribe();
  }
}
