import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RazorpayService } from '../../../service/razorpay.service';
import { IApiAppointment, Appointment } from '../../../model/appoinment';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-appoinment',
  templateUrl: './appoinment.component.html',
  styleUrls: ['./appoinment.component.css']
})
export class AppoinmentComponent implements OnInit, OnDestroy {
  response!: IApiAppointment;
  public showModal: boolean = false;
  private subscription: Subscription = new Subscription();

  callProviders: {
    firstName: string;
    lastName: string;
    callproviderId: string;
    amountOfCourse: number;
    rating: number;
    review: string;
    userId: string | undefined;
  }[] = [];
  constructor(
    private razorpayService: RazorpayService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {


    this.http.get<IApiAppointment>('/callprovider/getcallprovider', { withCredentials: true }).subscribe({
      next: (response: IApiAppointment) => {
        if (response.success) {
          this.callProviders = response.data.map((provider: Appointment) => ({
            firstName: provider.callprovider.firstName,
            callproviderId: provider.callprovider._id,
            lastName: provider.callprovider.lastName,
            amountOfCourse: provider.amount,
            rating: 4.5,
            review: 'Great experience!',
            userId: provider.userId ?? ""
          }));
        }
      },
      error: (error: string) => {

        console.error("Error fetching call providers:", error);
      },
      complete: () => {

        console.log("Completed fetching call providers");
      }
    });


  }
  time(userId: string | undefined) {
    console.log(userId, "userId");

    this.http.get<IApiAppointment>(`/user/getTime/${userId}`, { withCredentials: true }).subscribe({
      next: (response: IApiAppointment) => {
        this.showModal = true;
        if (response.success) {
          this.response = response;
          console.log(this.response, "response");
        } else {
          console.error('Error loading users:', response.message);
        }
      },
      error: (error) => {
        console.error('HTTP GET Error:', error);
      },
      complete: () => {
        // Optional: code to execute when the observable completes.
        console.log('Subscription completed');
      }
    });


  }
  closeModal() {

    this.showModal = false
  }
  openRazorpayModal(callprovider: string, time: string) {
    console.log("hi");
    this.showModal = false
    console.log(callprovider, time);

    const paymentAmount = 1000 * 100;
    const response = this.razorpayService.createPayment(paymentAmount, callprovider, time);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
