import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { MarketComponent } from './market/market.component';
import { MessagesComponent } from './messages/messages.component';



@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    UsersListComponent,
    AddUserComponent,
   EditUserComponent,
   MarketComponent,
   MessagesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AgChartsAngularModule,
    FormsModule ,
    ReactiveFormsModule,

  ],  bootstrap: [],
   exports: [
    AdminNavbarComponent
  ]
})
export class AdminModule { }
