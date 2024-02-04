import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { HttpClient } from '@angular/common/http';
import { IApiAppointment, Appointment } from '../../../model/appoinment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public chartOptions: AgChartOptions = {
    series: [{ type: 'bar', xKey: 'date', yKey: 'amount' }],
    data: [],
  };
  appointmentsData: Appointment[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<IApiAppointment>('/admin/getMarket').subscribe(
      (response: IApiAppointment) => {
        console.log(response);
        this.appointmentsData = response.data;

        // Log the appointmentsData to the console
        console.log('Appointments Data:', this.appointmentsData);

        if (this.appointmentsData.length > 0) {
          this.chartOptions.data = this.appointmentsData.map(item => ({ date: item.date, amount: item.amount }));
        }

        console.log(this.chartOptions.data, " this.chartOptions.data");

      }
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
