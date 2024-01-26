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
import { ProfileComponent } from './profile/profile.component';
import { TradingComponent } from './trading/trading.component';
import { AppoinmentComponent } from './appoinment/appoinment.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { FooterComponent } from './footer/footer.component';
import { YourtradeComponent } from './yourtrade/yourtrade.component';
import { VedioComponent } from './vedio/vedio.component';
import { ContactComponent } from './contact/contact.component';
import { VediocallComponent } from './vediocall/vediocall.component';





@NgModule({
  declarations: [
    NavBarComponent,
    VediocallComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    OtpverificationComponent,
    SideBarComponent,
    OptionBuyingComponent,
    OptionSellingComponent,
    SwingTradeComponent,
    ProfilesidebarComponent,
    ProfileComponent,
    TradingComponent,
    AppoinmentComponent,
    ScheduleComponent,
    FooterComponent,
    YourtradeComponent,
    VedioComponent,
    ContactComponent,
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

