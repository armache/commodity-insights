import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EnsureModuleLoadedOnceGuard } from '../shared/import.guard';
import { AuthService } from './auth.service';
import { ProductFilterService } from './product-filter.service';
import { ProductService } from './product.service';

@NgModule({
  providers:[
    AuthService,
    ProductService,
    ProductFilterService
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard { 
  
  constructor(@Optional() @SkipSelf() parentModule: CoreModule){
    super(parentModule);
  }

}
