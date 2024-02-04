import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IApiUserRes } from '../../../model/usermodel';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnDestroy {
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
      password: ['', Validators.required],

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

    if (user.firstName.trim() === '' || user.email === '' || user.password === '' || user.lastName.trim() === '' || user.phoneNumber.trim() === '') {
      Swal.fire('please enter all the fields');
    } else if (this.hasFormErrors(this.form)) {
      Swal.fire("Check Inputs", 'Enter all input fields properly', "warning");
    } else if (!this.validateEmail(user.email)) {
      Swal.fire('Error', 'Please enter a valid email', 'error');
    } else {
      this.http.post<IApiUserRes>('/admin/addUser', user, { withCredentials: true }).subscribe({
        next: (response: IApiUserRes) => {
          console.log(response, "............");
          localStorage.setItem('userToken', response.token);
          this.router.navigate(['/admin/users'], { queryParams: { id: response.id } });
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Error', err.error.message, 'error');
        },

      });

    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
