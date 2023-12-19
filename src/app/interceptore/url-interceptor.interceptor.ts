import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable()
export class UrlInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { baseUrl } = environment
    const newReq = request.clone(
      { url: baseUrl + request.url }
    )
    console.log(newReq.url, 'new url from interceptor')
    return next.handle(newReq)
  }
}



