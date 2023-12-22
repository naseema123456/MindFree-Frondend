/* eslint-disable @typescript-eslint/consistent-type-imports */
import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core'
import { type CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing';
import Swal from 'sweetalert2'
import { isTokenExpired } from '../help/jwt-token'
import { authGuardGuard } from './auth-guard.guard';
describe('userGuardGuard', () => {
  let guard:authGuardGuard;
  
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // If your guard uses the router
      providers: [authGuardGuard],
    });
    guard = TestBed.inject(authGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});