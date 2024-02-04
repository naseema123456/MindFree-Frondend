import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IApiMsg } from '../../../model/notification';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();
  contactForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      console.log(formData, "formdata");
      const httpSubscription = this.http.post<IApiMsg>('/user/contact', formData, { withCredentials: true })
        .subscribe({
          next: (response: IApiMsg) => {
            console.log(response, "............");
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Your message has been sent to the admin.',
            });
            this.contactForm.reset();
          },
          error: (error) => {

            console.error('HTTP POST Error:', error);
          }
        });

      // Store the subscription
      this.subscription.add(httpSubscription);
    }
  }
  ngOnDestroy(): void {
    // Ensure all subscriptions are unsubscribed when the component is destroyed
    this.subscription.unsubscribe();
  }
}
