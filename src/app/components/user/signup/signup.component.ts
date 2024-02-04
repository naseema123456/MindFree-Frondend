import { HttpClient } from '@angular/common/http';
// import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IApiUserRes } from '../../../model/usermodel';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // Minimum length example
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
        ]
      ],
      rePassword: ['', Validators.required]
    });
  }


  validateEmail = (email: string): boolean => {
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
  passwordsMatch(): boolean {
    const password = this.form.get('password')?.value;
    const rePassword = this.form.get('rePassword')?.value;
    return password === rePassword;
  }


  onSubmit(): void {
    this.isSubmitted = true;
    const user = this.form.getRawValue();

    if (user.firstName.trim() === '' || user.email === '' || user.password === '' || user.lastName.trim() === '' || user.phoneNumber.trim() === '' || user.rePassword === '') {
      Swal.fire('please enter all the fields');
    } else if (!this.passwordsMatch()) {
      Swal.fire("Check Inputs", 'Conform password is mismatch', "warning");
      this.form.setErrors({ passwordMismatch: true });
    } else if (this.hasFormErrors(this.form)) {
      Swal.fire("Check Inputs", 'Enter all input fields properly', "warning");
    } else if (!this.validateEmail(user.email)) {
      Swal.fire('Error', 'Please enter a valid email', 'error');
    } else {
      this.http.post<IApiUserRes>('/user/register', user, { withCredentials: true }).subscribe({
        next: (response: IApiUserRes) => {
          console.log(response, "............");
          // Using 'response.id' directly, as 'Id' seems to be a typo or unused variable.
          this.router.navigate(['/user/otpverification'], { queryParams: { id: response.id } });
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Error', err.error.message, 'error');
        },

      });

    }
  }

  closeModal(): void {
    // This function will be used to close the modal
    this.form.setErrors({ passwordMismatch: null }); // Clear the custom error when the modal is closed
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
