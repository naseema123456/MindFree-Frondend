import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { IApiAllMsg, IApimsg } from '../../../model/notification';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  modal: boolean = false;
  responseData: IApimsg[] | null = null; // Use IApimsg[] based on IApiAllMsg
  selectedData: IApimsg | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.subscriptions.add(this.http.get<IApiAllMsg>('/admin/getMessages').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.responseData = response.data;
        } else {
          console.log(response.message);
          this.responseData = null; // Handle the case where response.data is undefined
        }
      },
      error: (error) => {
        console.error(error);
        Swal.fire('Error', error.error.message, 'error');
      }
    }));
  }

  showModal(id: string): void {
    this.selectedData = this.responseData?.find((item) => item.messages.message === id) || null;
    console.log(this.selectedData, "selectedData");
    this.modal = true;
  }

  closeModal(): void {
    this.modal = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
