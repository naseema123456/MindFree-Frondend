
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<string>,
    next: HttpHandler
  ): Observable<HttpEvent<string>> {
    // Check if the request URL is for login or register
    console.log('Bypassing interceptor from JwtInterceptor');
    if (request.url.includes('/login') || request.url.includes('/register')) {
      // If it is, do not add the JWT token
      return next.handle(request);
    }

    // Otherwise, add the JWT token from your authentication service
    const userToken =localStorage.getItem('userToken'); // Replace with your actual token retrieval logic
    // console.log('Bypassing interceptor from JwtInterceptor');
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    // console.log('Bypassing interceptor from JwtInterceptor');
    return next.handle(modifiedRequest);
  }
}
