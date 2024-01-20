import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApiAppointment } from 'src/app/model/appoinment';




@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit{

  appointmentsData: IApiAppointment|undefined;
  // Add this function to your TypeScript file
isObject(obj: any): obj is { firstName: string; lastName: string } {
  return typeof obj === 'object' && obj !== null && 'firstName' in obj && 'lastName' in obj;
}

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  this.http.get<IApiAppointment>('/admin/getMarket').subscribe(
    (response: IApiAppointment) => {
  console.log(response);
this.appointmentsData=response


    }
  );
  }

}
