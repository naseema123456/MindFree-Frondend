import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { isTokenExpired } from '../help/jwt-token';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root',
})
export class UserGuardGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('user guard working');
    const role = route.parent?.routeConfig?.path
    const token = localStorage.getItem(`userToken`)
console.log(role);

    if (token === null || isTokenExpired(token)) {
      if (role !== 'user') {
        void this.router.navigate([`/${role}/login`])
        return false
      }

      void Swal.fire({
        title: 'You are not logged in',
        text: 'Do you want to redirect to login page',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then(result => {
        if (result.isConfirmed) {
          void this.router.navigate(['/user/login'])
        }
      }).catch(
        void this.router.navigate(['/user/login'])
      )
      return false
    }
    return true
  }
}
