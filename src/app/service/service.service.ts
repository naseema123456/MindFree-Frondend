import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appUsers } from 'src/app/model/usermodel';
import { TradingRecord } from '../model/trading';
import { alltrade } from '../model/trading';
import { IApiAppointment } from 'src/app/model/appoinment';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  loadUsers(): Observable<appUsers> {
    return this.http.get<appUsers>('/admin/Users', {
      withCredentials: true,
    });
  }

  loadProfile() {
    console.log("loadprofile() is called");
    console.log();
    
    return this.http.get('/user/profile', {
      withCredentials: true,
      headers: { 'Bypass-Interceptor': 'true' } 
    });
  }


  loadTrade(): Observable<alltrade> {
    return this.http.get<alltrade>('/callprovider/loadTrade', {
      withCredentials: true,
    });
  }


  loadAppoinment(): Observable<IApiAppointment> {
    return this.http.get<IApiAppointment>('/callprovider/getappoinment', {
      withCredentials: true,
    });
    
  }


  loadAllAppoinment():Observable<IApiAppointment> {
    return this.http.get<IApiAppointment>('/callprovider/getAllappoinment', {
      withCredentials: true,
    });
  }
}
