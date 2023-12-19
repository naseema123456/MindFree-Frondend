import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IApiUserRes } from 'src/app/model/usermodel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;

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

  onSubmit(): void {
    this.isSubmitted = true;
    let user = this.form.getRawValue();

    if(user.email === '' || user.password === '') {
      Swal.fire('Please enter all the fields', 'Warning!');
    } else if (this.hasFormErrors(this.form)) {
      Swal.fire("Check Inputs", 'Enter all input fields properly', "warning");
    } else {
      this.http.post<IApiUserRes>('/user/login', user, { withCredentials: true }).subscribe(
        (response:IApiUserRes) => {
       
          console.log(response,"............");
          let Id=response.id
           localStorage.setItem('userToken', response.token)
          this.router.navigate(['/user/home']);
        },
        (err) => {
          Swal.fire("Error", err.error.message, "error");
        }
      );
    }
  }
}
