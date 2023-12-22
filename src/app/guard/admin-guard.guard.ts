import { CanActivate ,Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { isTokenExpired } from '../help/jwt-token';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root',
})
export class AdminGuardGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(): boolean {

  const token = localStorage.getItem(`adminToken`)
  if (token === null || isTokenExpired(token) ||!token) {

    void Swal.fire({
      title: 'You are not logged in',
      text: 'Do you want to redirect to login page',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Login',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
       this.router.navigate(['/admin/login'])
      }
    }) .catch(() => {
      // Handle the case where there was an error showing the Swal alert
      console.error('Error showing Swal alert');
    });

  return false;
}

return true;
}
}
