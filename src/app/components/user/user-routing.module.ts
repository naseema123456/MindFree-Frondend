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



const routes: Routes = [

  {
    path:'register',component:SignupComponent,canActivate:[AuthGuardGuard]
  },
  {
    path:'login',component:LoginComponent,canActivate:[AuthGuardGuard]
  },
  {
    path:'otpverification',component:OtpverificationComponent
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
