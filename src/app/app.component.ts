import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { slideInAnimation } from './shared/animation';
import { getUserState } from './user/state/user.reducer';
import { UserState } from './user/state/user.state';
import * as UserActions from './user/state/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  user$: Observable<UserState> | undefined;

  constructor(private store: Store<UserState>) {
  }

  ngOnInit(): void {

    this.user$ = this.store.select(getUserState);
  }

  logout(): void {
    this.store.dispatch(UserActions.LOGOUT());
  }
}
