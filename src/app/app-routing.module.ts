import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/pageNotFound/page-not-found/page-not-found.component';
// import { userGuardGuard } from './guard/user-guard.guard';
// import { userGuardGuard } from './guard/user-guard.guard';

const routes: Routes = [
  { path: 'user', title: 'User', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule) },
  {
    path: '',
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
