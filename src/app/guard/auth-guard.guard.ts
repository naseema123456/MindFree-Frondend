/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core'
import { type CanActivate, Router, ActivatedRouteSnapshot ,RouterStateSnapshot,} from '@angular/router'

import { isTokenExpired } from '../help/jwt-token'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor (private readonly router: Router) {}

  canActivate (route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {

    // const token = localStorage.getItem(`${role}RefreshToken`)
    const token = localStorage.getItem(`userToken`)
console.log("auth-guard",token);

if (token && !isTokenExpired(token)) {
  // User is authenticated, redirect to the home page
  this.router.navigate(['/user/home']);
  return false; // Deny access to the requested route
} else {
  // User is not authenticated, allow access to the requested route
  return true;
}
}

}