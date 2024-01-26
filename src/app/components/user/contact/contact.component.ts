import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IApiMsg } from 'src/app/model/notification';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
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
      this.http.post<IApiMsg>('/user/contact', formData, { withCredentials: true }).subscribe(
        (response:IApiMsg) => {
          console.log(response,"............");
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your message has been sent to the admin.',
          });
    
          // You can reset the form after successful submission
          this.contactForm.reset();
    
     
        },)
    }
  }
}
