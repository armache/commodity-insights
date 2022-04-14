import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserState } from '../state/user.state';
import { UserType } from '../user';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { LoginComponent } from './login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatSelectHarness} from '@angular/material/select/testing';
import { getAuthError, initialUserState } from '../state/user.reducer';
import * as UserActions from './../state/user.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loader: HarnessLoader;
  let mockStore: MockStore<UserState>;

  const initialState: UserState = initialUserState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        NoopAnimationsModule
      ],
      providers: [
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
    loader = TestbedHarnessEnvironment.loader(fixture);
    
    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(getAuthError, '');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Select with 2 options', async () => {

    const selectHarness = await loader.getHarness(MatSelectHarness);
    await selectHarness.open();
    const actual = (await selectHarness.getOptions()).length;

    expect(actual).toBe(2);
  });

  it('should disable Login button by default', async () => {

    const loginButton = await loader.getHarness(MatButtonHarness);
    expect(await loginButton.isDisabled()).toBe(true);
  });

  it('should enable Login button when UserType option is selected', async () => {

    const selectHarness = await loader.getHarness(MatSelectHarness);
    await selectHarness.open();
    const options = (await selectHarness.getOptions());
    await options[0].click();

    const selectedUserType = await options[0].getText();
    const loginButton = await loader.getHarness(MatButtonHarness);

    expect(await loginButton.isDisabled()).toBe(false);
    expect(<UserType>selectedUserType).toBe(UserType.Trader);
  });

  it('should dispatch Login action when Login button is clicked', async () => {

    spyOn(mockStore, 'dispatch').and.callThrough();

    const selectHarness = await loader.getHarness(MatSelectHarness);
    await selectHarness.open();
    const options = (await selectHarness.getOptions());
    await options[0].click();

    let selectedUserType = await options[0].getText();
    expect(<UserType>selectedUserType).toBe(UserType.Trader);

    const loginButton = await loader.getHarness(MatButtonHarness);

    expect(await loginButton.isDisabled()).toBe(false);
    await loginButton.click();

    const expectedAction = UserActions.LOGIN({ userType: <UserType>selectedUserType });
    expect(mockStore.dispatch).toHaveBeenCalledOnceWith(expectedAction);
  });  
});