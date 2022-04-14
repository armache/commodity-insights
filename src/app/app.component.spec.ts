import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { getUserState, initialUserState } from './user/state/user.reducer';
import { UserState } from './user/state/user.state';
import { UserType } from './user/user';
import * as UserActions from './user/state/user.actions';

describe('AppComponent', () => {

  const initialState: UserState = initialUserState;
  let mockStore: MockStore<UserState>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        provideMockStore({initialState})
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Commodity Insights'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Commodity Insights');
  });

  it('should not render logout button if user is not authenticated', () => {
    const fixture = TestBed.createComponent(AppComponent);

    let  nonAuthenticatedUserState: UserState = initialUserState;
    nonAuthenticatedUserState.userType = UserType.None;
    nonAuthenticatedUserState.isAuthenticated = false;

    mockStore.overrideSelector(getUserState, initialUserState);

    fixture.detectChanges();

    const btnLogout = fixture.debugElement.query(By.css('.logout-icon'))?.nativeElement;

    expect(btnLogout).toBeUndefined();
  });

  it(`should render Logout button if user is authenticated`, () => {

    const fixture = TestBed.createComponent(AppComponent);

    let  authenticatedUserState: UserState = initialUserState;
    authenticatedUserState.userType = UserType.Developer;
    authenticatedUserState.isAuthenticated = true;

    mockStore.overrideSelector(getUserState, authenticatedUserState);
    
    fixture.detectChanges();

    const btnLogout = fixture.debugElement.query(By.css('.logout-icon'));

    expect(btnLogout).toBeDefined();
    expect(btnLogout.nativeElement.textContent).toBe('logout');
  });

  it(`should get UserState on load`, () => {

    spyOn(mockStore, 'select').and.callThrough();

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(mockStore.select).toHaveBeenCalledOnceWith(getUserState);
  });  

  it(`should dispatch Logout action on Logout button click`, () => {

    spyOn(mockStore, 'dispatch').and.callThrough();
    const fixture = TestBed.createComponent(AppComponent);

    let  authenticatedUserState: UserState = initialUserState;
    authenticatedUserState.userType = UserType.Developer;
    authenticatedUserState.isAuthenticated = true;

    mockStore.overrideSelector(getUserState, authenticatedUserState);
    
    fixture.detectChanges();

    const btnLogout = fixture.debugElement.query(By.css('.logout-icon'));
    btnLogout.nativeElement.click();

    fixture.detectChanges();

    const expectedAction = UserActions.LOGOUT();
    expect(mockStore.dispatch).toHaveBeenCalledOnceWith(expectedAction);
  });
});
