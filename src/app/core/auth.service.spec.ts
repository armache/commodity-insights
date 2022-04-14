import { TestBed } from '@angular/core/testing';
import { UserType } from '../user/user';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return authenticated user when UserType is specified', () => {
    
    const userType = UserType.Trader;

    service.login(userType).subscribe(result => {
      expect(result).toBeDefined();
      expect(result.user.isAuthenticated).toBe(true);
    });
  });

  it('should return not authenticated user when UserType is "None"', () => {
    
    const userType = UserType.None;
    
    service.login(userType).subscribe(result => {
      expect(result).toBeDefined();
      expect(result.user.isAuthenticated).toBe(false);
    });
  });
});
