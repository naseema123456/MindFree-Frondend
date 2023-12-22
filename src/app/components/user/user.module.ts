import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UserRoutingModule } from './user-routing.module';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OtpverificationComponent } from './otpverification/otpverification.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponentComponent } from './user-profile/user-profile-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from './side-bar/side-bar.component';
import { OptionBuyingComponent } from './option-buying/option-buying.component';
import { OptionSellingComponent } from './option-selling/option-selling.component';
import { SwingTradeComponent } from './swing-trade/swing-trade.component';
// import { userGuardGuard } from 'src/app/guard/user-guard.guard';



@NgModule({
  declarations: [
    NavBarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    OtpverificationComponent,
    UserProfileComponentComponent,
    SideBarComponent,
    OptionBuyingComponent,
    OptionSellingComponent,
    SwingTradeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ], 
  exports: [
    NavBarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    OtpverificationComponent,
    UserProfileComponentComponent,
    SideBarComponent,
    OptionBuyingComponent,
    OptionSellingComponent,
    SwingTradeComponent
  ],
  
})
export class UserModule { }

