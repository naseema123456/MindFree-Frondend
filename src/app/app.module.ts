import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptorInterceptor } from './interceptore/url-interceptor.interceptor';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



import { PageNotFoundComponent } from './components/pageNotFound/page-not-found/page-not-found.component';
// import { SwingTradeComponent } from './swing-trade/swing-trade.component';
// import { OptionBuyingComponent } from './option-buying/option-buying.component';
// import { OptionSellingComponent } from './option-selling/option-selling.component';
// import { SideBarComponent } from './side-bar/side-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:UrlInterceptorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
