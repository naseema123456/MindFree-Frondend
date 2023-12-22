import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/pageNotFound/page-not-found.component';


const routes: Routes = [
  { path: 'user', title: 'User', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule) },
  { path: 'admin', title: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  }, 
   {
    path: 'login',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: '**',
    title: 'Page Not Found',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
