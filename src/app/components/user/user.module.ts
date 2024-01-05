import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { HomeComponent } from './home/home.component';
import { profileReducer } from './state/user.reducer';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OtpverificationComponent } from './otpverification/otpverification.component';
import { SignupComponent } from './signup/signup.component';
// import { UserProfileCompo } from '';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from './side-bar/side-bar.component';
import { OptionBuyingComponent } from './option-buying/option-buying.component';
import { OptionSellingComponent } from './option-selling/option-selling.component';
import { SwingTradeComponent } from './swing-trade/swing-trade.component';
import { ProfilesidebarComponent } from './profilesidebar/profilesidebar.component';
// import { StoreModule } from '@ngrx/store';
// import { appService } from './state/user.service'; 
// import { UserGuardGuard } from 'src/app/guard/user-guard.guard';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProfileComponent } from './profile/profile.component';
import { RequestComponent } from './request/request.component';
import { TradingComponent } from './trading/trading.component';
import { AppoinmentComponent } from './appoinment/appoinment.component';
import { SetTimeComponent } from './set-time/set-time.component';

// import { EffectsModule } from '@ngrx/effects';
// import { userEffects } from './state/user.effects';




@NgModule({
  declarations: [
    NavBarComponent,

    SignupComponent,
    LoginComponent,
    HomeComponent,
    OtpverificationComponent,
    // UserProfileComponentComponent,
    SideBarComponent,
    OptionBuyingComponent,
    OptionSellingComponent,
    SwingTradeComponent,
    // SweetAlert2Module,
    ProfilesidebarComponent,
    ProfileComponent,
    RequestComponent,
    TradingComponent,
    AppoinmentComponent,
    SetTimeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // StoreModule.forRoot({
    //   userdetails: profileReducer
    // }),
    // EffectsModule.forRoot([userEffects]),
    // providers: [appService, UserGuardGuard],

  ], 
  exports: [
    NavBarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    OtpverificationComponent,
    // UserProfileComponentComponent,
    SideBarComponent,
    OptionBuyingComponent,
    OptionSellingComponent,
    SwingTradeComponent
  ],

})
export class UserModule { }

