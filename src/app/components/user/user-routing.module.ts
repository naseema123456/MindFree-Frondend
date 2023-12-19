import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { userGuardGuard } from 'src/app/guard/user-guard.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OtpverificationComponent } from './otpverification/otpverification.component';
import { SignupComponent } from './signup/signup.component';
import { authGuardGuard } from 'src/app/guard/auth-guard.guard';
import { UserGuardGuard } from 'src/app/guard/user-guard.guard';
import { SwingTradeComponent } from './swing-trade/swing-trade.component';
import { OptionBuyingComponent } from './option-buying/option-buying.component';
import { OptionSellingComponent } from './option-selling/option-selling.component';



const routes: Routes = [

  {
    path:'register',component:SignupComponent,canActivate:[authGuardGuard]
  },
  {
    path:'login',component:LoginComponent,canActivate:[authGuardGuard]
  },
  {
    path:'otpverification',component:OtpverificationComponent,canActivate:[authGuardGuard]
  },
  {
    path:'home',component:HomeComponent,canActivate:[UserGuardGuard]
  },
  // {
  //   path:'swingTrade',component:SwingTradeComponent
  // },{
  //   path:'optionBuying',component:OptionBuyingComponent
  // },{
  //   path:'optionSelling',component:OptionSellingComponent
  // },
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
