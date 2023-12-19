import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserGuardGuard } from './user-guard.guard';

describe('userGuardGuard', () => {
  let guard: UserGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // If your guard uses the router
      providers: [UserGuardGuard],
    });
    guard = TestBed.inject(UserGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
