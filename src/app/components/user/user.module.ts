import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UserRoutingModule } from './user-routing.module';

import { HomeComponent } from './home/home.component';
import { profileReducer } from './state/user.reducer';
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
import { ProfileComponent } from './profile/profile.component';
import { ProfilesidebarComponent } from './profilesidebar/profilesidebar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appService } from './state/user.service'; 
import { UserGuardGuard } from 'src/app/guard/user-guard.guard';
import { AppComponent } from 'src/app/app.component';
// import { EffectsModule } from '@ngrx/effects';
// import { userEffects } from './components/user/state/user.effects';
// import { userGuardGuard } from 'src/app/guard/user-guard.guard';



@NgModule({
  declarations: [
    NavBarComponent,
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    OtpverificationComponent,
    UserProfileComponentComponent,
    SideBarComponent,
    OptionBuyingComponent,
    OptionSellingComponent,
    SwingTradeComponent,
    ProfileComponent,
    ProfilesidebarComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      userdetails: profileReducer
    }),
    EffectsModule.forRoot([userEffects]),
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
  providers: [appService, UserGuardGuard],
  bootstrap: [AppComponent]
})
export class UserModule { }

