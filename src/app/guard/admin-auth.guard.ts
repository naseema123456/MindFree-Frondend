import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(): boolean {
    const adminToken = localStorage.getItem('adminToken');

    if (adminToken) {
      this.router.navigate(['/admin/dashboard']); // Change the route accordingly
      return false; // Deny access to the admin login page
    } else {
      return true; // Admin token is not present, allow access to the requested route
    }
  }
}
