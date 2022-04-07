import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { getAuthError } from '../state/user.reducer';
import { UserState } from '../state/user.state';
import { UserType } from '../user';
import * as UserActions from './../state/user.actions';

@Component({
  selector: 'aa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  options = new Array<string>();
  roles = UserType;
  selectedRole: UserType = UserType.None;
  errorMessage$: Observable<string> | undefined;

  constructor(private authService: AuthService, private router: Router,
    private store: Store<UserState>) { 
      
    }

  ngOnInit(): void {
    this.options = Object.keys(this.roles)
      .filter(role => isNaN(Number(role)) && role !== 'None');

    this.errorMessage$ = this.store.select(getAuthError);
  }

  change($evt: string){
    this.selectedRole = <UserType>$evt;
  }

  login(): void {
    this.store.dispatch(UserActions.LOGIN({ userType: this.selectedRole }));
  }

}
