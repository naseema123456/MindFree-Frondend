import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OtpverificationComponent } from './otpverification/otpverification.component';
import { SignupComponent } from './signup/signup.component';

import { UserGuardGuard } from 'src/app/guard/user-guard.guard';
import { SwingTradeComponent } from './swing-trade/swing-trade.component';
import { OptionBuyingComponent } from './option-buying/option-buying.component';
import { OptionSellingComponent } from './option-selling/option-selling.component';
import { AuthGuardGuard } from 'src/app/guard/auth-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { RequestComponent } from './request/request.component';
import { TradingComponent } from './trading/trading.component';
import { AppoinmentComponent } from './appoinment/appoinment.component';
import { SetTimeComponent } from './set-time/set-time.component';



const routes: Routes = [

  {
    path:'register',component:SignupComponent,canActivate:[AuthGuardGuard]
  },
  {
    path:'login',component:LoginComponent,canActivate:[AuthGuardGuard]
  },
  {
    path:'otpverification',component:OtpverificationComponent,canActivate:[AuthGuardGuard]
  },
  {
    path:'home',component:HomeComponent,canActivate:[UserGuardGuard]
  },
  {
    path:'swingTrade',component:SwingTradeComponent,canActivate:[UserGuardGuard]
  },{
    path:'optionBuying',component:OptionBuyingComponent,canActivate:[UserGuardGuard]
  },{
    path:'optionSelling',component:OptionSellingComponent,canActivate:[UserGuardGuard]
  },

  {
    path:'profile',component:ProfileComponent,canActivate:[UserGuardGuard]
  },
  {
    path:'request',component:RequestComponent,canActivate:[UserGuardGuard]
  },
  {
    path:'trading',component:TradingComponent,canActivate:[UserGuardGuard]
  },
  {
    path:'appoinment',component:AppoinmentComponent,canActivate:[UserGuardGuard]
  },
  {
    path:'setTime',component:SetTimeComponent,canActivate:[UserGuardGuard]
  },
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
