import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { UsersListComponent } from './users-list/users-list.component';

import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';



@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    UsersListComponent,
    AddUserComponent,
   EditUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule ,
    ReactiveFormsModule,

  ], exports: [
    AdminNavbarComponent
  ]
})
export class AdminModule { }
