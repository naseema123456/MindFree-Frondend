// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Router } from '@angular/router';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   constructor(private readonly router: Router) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     if (request.headers.has('Bypass-Interceptor')) {
//       const updatedHeaders = request.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
//       console.log('Bypassing interceptor from JwtInterceptor');
//       return next.handle(request.clone({ headers: updatedHeaders }));
//     }
//     console.log('Interceptor started');
//     const urlArr = request.url.split('/');
//     const user = urlArr[0];
//     const route = urlArr[1]

//     console.log('handling route : ', route);
//     console.warn(urlArr, 'urlArr');

//     if (route === 'login' || route === 'register'|| route === 'otpverification') {
//       return next.handle(request)
//     }
   

//     let jwt: string | null = '';
   
//       console.log(user + 'userToken');
//       jwt = localStorage.getItem(user + 'userToken');
    

//     console.log('jwt:', jwt);

//     if (jwt != null) {
//       const authorizedRequest = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });

//       console.log('Authorized Request:', authorizedRequest);

//       return next.handle(authorizedRequest);
//     } else {
//       console.warn('JWT not found in localStorage. Making the request without Authorization header.');
//       return next.handle(request);
//     }
//   }
// }



// jwt-interceptor.service.ts

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
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
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
