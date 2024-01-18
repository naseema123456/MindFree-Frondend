import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/usermodel';
import { IApiUserRes } from 'src/app/model/usermodel';

@Injectable()
export class appService {
  getUserProfile() {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}


  loadProfile() {
    console.log("loadprofile() is called");
    
    return this.http.get('/user/profile', {
      withCredentials: true,
    });
  }
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  mapResponseToUser(response: IApiUserRes): User | null {
    if (response.data && response.data.length > 0) {
      // Assuming you want to return the first user if there are multiple
      return response.data[0];
    } else {
      return null;
    }
  }
  loadProfile(){

    const profileData =  this.http.get<IApiUserRes>('/user/profile',{ headers: { 'Bypass-Interceptor': 'true' }  });

    profileData.subscribe(
      (response: IApiUserRes) => {
        // console.log('Profile data from service:', response);
   
        const user = this.mapResponseToUser(response);

      },
      (error) => {
        console.error('Error loading profile data:', error);
        // Handle the error
      }
    );

    return profileData;
  }
}