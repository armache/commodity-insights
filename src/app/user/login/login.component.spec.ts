import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/auth.service';
import { UserState } from '../state/user.state';
import { UserType } from '../user';
import {MockStore, provideMockStore } from "@ngrx/store/testing";

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const initialState: UserState = {
    userType: UserType.None,
    isAuthenticated: false,
    canViewLogs: false,
    error: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AuthService,
        provideMockStore({initialState})
      ],
      declarations: [LoginComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

