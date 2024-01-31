import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IApiUserRes } from 'src/app/model/usermodel';
import { otpverify } from 'src/app/model/usermodel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  public showModal: boolean = false;
  public showOtpInput: boolean = false;
  public showEmail: boolean = false;
  public showPasswordInput: boolean = false;
  
  email: string = '';
  otp: string = ''; 
  id:string='';
  confirmPassword:string='';
  password:string='';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    
    });
  }
  passwordsMatch(): boolean {
   
    return this.password === this.confirmPassword;
  }
 

  ValidateEmail = (email: string): boolean => {
    var validRejex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRejex)) {
      return true;
    } else {
      return false;
    }
  };

  ngOnInit(): void {
 
  }
  
  get f(){
    return this.form.controls;
  }

  hasFormErrors(form: FormGroup): boolean {
    if (form.invalid) {
      return true; // There are form validation errors
    }
    return false; // No form validation errors
  }

  toggleModal() {
    
    this.showModal = true;
 this.showEmail=true
  }
  sendOtp() {
    console.log('Sending OTP to:', this.email);
    const otpemail=this.email
    this.http.get<IApiUserRes>(`/user/forgot/${otpemail}`, { withCredentials: true }).subscribe(
      (response: IApiUserRes) => {
        console.log(response, "............");
        if(response.status==200){
          this.id = response.id;
          this.showEmail=false
          this.showOtpInput = true;
         
       
         }else {
        // Show SweetAlert alert in case of an errorshow
        this.showModal=false
        this.showEmail=false
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to send OTP. Please try again.',
        });
      }
    },
    (error) => {
      console.error('Error:', error);
      this.showModal=false
      this.showEmail=false
      // Show SweetAlert alert for general error handling
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
      });
    }
  );
}
  verifyOtp(){
    console.log('Verifying OTP for id:', this.id);
    console.log('Sending OTP to:', this.otp);
  this.http.post<otpverify>('/user/verify-otp', { otp: this.otp, id: this.id  }, { withCredentials: true }).subscribe(
      (response: otpverify) => {
        
        if (response) {
          console.log(response, 'response from verify otp');

          if (response.success == true) {
            this.showOtpInput = false;
            this.showPasswordInput=true
          } else {
            this.showModal=false
            this.showOtpInput = false;
            Swal.fire({
              title: 'Error!',
              text: 'Invalid OTP. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
         
          }
        }
      },
      (err: any) => {
        console.log(err);
        this.showModal=false
        this.showOtpInput = false;
        Swal.fire('Error', err.error.message, 'error');
      }
    );
    
  }
  updatePassword(){
    console.log('Verifying OTP for id:', this.id);
    console.log('Verifying OTP for id:', this.password,this.confirmPassword);
    if(!this.passwordsMatch()) {
      Swal.fire("Check Inputs", 'Conform password is mismatch', "warning");
    }else{
      this.http.post<IApiUserRes>('/user/resetpassword', { password:this.password,id:this.id }, { withCredentials: true }).subscribe(
        (response:IApiUserRes) => {
          console.log(response);
          this.showModal = false;
          this.showEmail=false
          this.showOtpInput= false;
           this.showEmail= false;
        this.showPasswordInput= false;
          if (response.success == true) {
            Swal.fire({
              icon: 'success',
              title: 'Password Reset Successful',
              text: 'Your password has been successfully reset.',
            });
            this.router.navigate(['/user/login']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Password reset failed. Please try again.',
            });
            this.router.navigate(['/user/login']);
          }
        },
        (error) => {
          console.error('Error resetting password:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please try again later.',
          });
        }
      );
    }
  }
  onSubmit(): void {
    this.isSubmitted = true;
    let user = this.form.getRawValue();

    if(user.email === '' || user.password === '') {
      Swal.fire('Please enter all the fields', 'Warning!');
    } else if (this.hasFormErrors(this.form)) {
      Swal.fire("Check Inputs", 'Enter all input fields properly', "warning");
    } else {
      this.http.post<IApiUserRes>('/user/login', user, ).subscribe(
        (response:IApiUserRes) => {
       
          console.log(response,"............");
          let userId = response.user?._id?.toString() ?? '';
          console.log(response.user,"usrer");
         console.log(userId,"id");
         

           localStorage.setItem('userToken', response.token)
           localStorage.setItem('id', userId);
          this.router.navigate(['/user/home']);
        },
        (err) => {
          Swal.fire("Error", err.error.message, "error");
        }
      );
    }
  }
  closeModal(){
     this.showModal = false;
     this.showOtpInput = false;
     this.showEmail = false;
     this.showPasswordInput = false;
  }
}
