import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private baseUrl = environment; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}
  getUser(userId: string): Observable<any> {
    const url = `${this.baseUrl}/getuser`;
    // const params = new HttpParams().set('id', userId);
    // return this.http.get(url, { params });
    return this.http.get(url, { params: { id: userId } });
  }
  sendMessage(message: string, conversationId: string): Observable<any> {
    const url = `${this.baseUrl}/sendmessage`;
    const payload = { message, conversationId };
    return this.http.post(url, payload);
  }
}
