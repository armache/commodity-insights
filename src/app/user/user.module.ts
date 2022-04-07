import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user.reducer';
import { UserRoutingModule } from './user-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  exports:[
    LoginComponent
  ]
})
export class UserModule { }
