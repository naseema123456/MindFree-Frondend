import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AdminGuardGuard } from 'src/app/guard/admin-guard.guard';
import { AdminAuthGuard } from 'src/app/guard/admin-auth.guard';
import { MarketComponent } from './market/market.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, 
  {
    path:'login',component:LoginComponent,canActivate:[AdminAuthGuard]
  },
  {
    path:'dashboard',component:DashboardComponent,canActivate:[AdminGuardGuard]
  },
  {
    path:'users',component:UsersListComponent,canActivate:[AdminGuardGuard]
  },
  {
    path:'addUser',component:AddUserComponent,canActivate:[AdminGuardGuard]
  },
  {
    path:'editUser/:userId',component:EditUserComponent,canActivate:[AdminGuardGuard]
  },
  {
    path:'market',component:MarketComponent,canActivate:[AdminGuardGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
