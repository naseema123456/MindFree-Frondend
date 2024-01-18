import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from './components/user/state/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { userEffects } from './components/user/state/user.effects';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptorInterceptor } from './interceptore/url-interceptor.interceptor';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



import { PageNotFoundComponent } from './components/pageNotFound/page-not-found.component';
import { JwtInterceptor } from './interceptore/jwt-interceptor.interceptor';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';






@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // SocketIoModule.forRoot(config),
    StoreModule.forRoot({ userdetails: profileReducer }),
    StoreModule.forRoot({
      userdetails: profileReducer
    }),
    EffectsModule.forRoot([userEffects]),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:UrlInterceptorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
