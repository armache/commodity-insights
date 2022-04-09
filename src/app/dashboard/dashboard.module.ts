import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from './products/products.component';
import { NgChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from './products/state/product.reducer';
import { ProductEffects } from './products/state/product.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeyMetricsTableComponent } from './products/key-metrics-table/key-metrics-table.component';
import { TradeLogsComponent } from './trade-logs/trade-logs.component';
import { ProductFilterService } from './products/product-filter/product-filter.service';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { MonthlyPnlPipe } from './products/key-metrics-table/monthly-pnl.pipe';
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
