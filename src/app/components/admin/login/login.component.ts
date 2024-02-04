import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IApiUserRes } from '../../../model/usermodel';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ValidateEmail = (email: string): boolean => {
    const validRejex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRejex)) {
      return true;
    } else {
      return false;
    }
  };

  ngOnInit(): void {

  }

  get f() {
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
    const user = this.form.getRawValue();

    if (user.email === '' || user.password === '') {
      Swal.fire('Please enter all the fields', 'Warning!');
    } else if (this.hasFormErrors(this.form)) {
      Swal.fire("Check Inputs", 'Enter all input fields properly', "warning");
    } else {
      this.http.post<IApiUserRes>('/admin/login', user, { withCredentials: true }).subscribe({
        next: (response: IApiUserRes) => {
          console.log(response, "............");
          localStorage.setItem('adminToken', response.token);
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          Swal.fire("Error", err.error.message, "error");
        }
        // You can include a 'complete' callback here if there's a need, but it's optional
        // and often not used for HTTP requests since they complete immediately after emitting a response or an error.
      });

    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

