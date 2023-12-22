import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appUsers } from 'src/app/model/usermodel';
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
    
    return this.http.get('/user/profile', {
      withCredentials: true,
    });
  }
}
