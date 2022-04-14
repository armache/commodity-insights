import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EnsureModuleLoadedOnceGuard } from '../shared/import.guard';
import { AuthService } from './auth.service';

@NgModule({
  providers:[
    AuthService
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard { 
  
  constructor(@Optional() @SkipSelf() parentModule: CoreModule){
    super(parentModule);
  }

}
