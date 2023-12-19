/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core'
import { type CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router'
import Swal from 'sweetalert2'
import { isTokenExpired } from '../help/jwt-token'

@Injectable({
  providedIn: 'root'
})
export class authGuardGuard implements CanActivate {
  constructor (private readonly router: Router) {}

  canActivate (route: ActivatedRouteSnapshot): boolean {
    const role = route.parent?.routeConfig?.path
    // const token = localStorage.getItem(`${role}RefreshToken`)
    const token = localStorage.getItem(`userToken`)
console.log("auth-guard",token);

   
      if(token|| token === null || isTokenExpired(token)){
        void this.router.navigate([`/user/home`])
      return false
    } else {
    
      return true
    }
}}