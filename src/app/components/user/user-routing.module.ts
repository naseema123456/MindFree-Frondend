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
import { TradingComponent } from './trading/trading.component';
import { AppoinmentComponent } from './appoinment/appoinment.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { YourtradeComponent } from './yourtrade/yourtrade.component';
import { VediocallComponent } from './vediocall/vediocall.component';
import { ContactComponent } from './contact/contact.component';



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
    path:'trading',component:TradingComponent,canActivate:[UserGuardGuard]
  },
  {
    path:'appoinment',component:AppoinmentComponent,canActivate:[UserGuardGuard]
  },
  {
    path:'schedule',component:ScheduleComponent,canActivate:[UserGuardGuard]
  },
  {
    path:'yourtrade',component:YourtradeComponent,canActivate:[UserGuardGuard]
  },
  {
    path:'videocall/:id',component:VediocallComponent,canActivate:[UserGuardGuard]
  },
  {
    path:'contact',component:ContactComponent,canActivate:[UserGuardGuard]
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
