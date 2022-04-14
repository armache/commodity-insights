import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProductFilterService } from './products/product-filter/product-filter.service';
import { ProductsModule } from './products/products.module';
import { TradeLogsModule } from './trade-logs/trade-logs.module';
import { DashboardService } from './dashboard.service';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    ProductsModule,
    TradeLogsModule
  ],

  providers: [
    DashboardService,
    ProductFilterService
  ]
})
export class DashboardModule { }
