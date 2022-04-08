import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TrendsComponent } from './products/products.component';
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
import { ProductService } from './products/product.service';

@NgModule({
  declarations: [
    DashboardComponent,
    TrendsComponent,
    ProductFilterComponent,
    KeyMetricsTableComponent,
    TradeLogsComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    NgChartsModule,
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects]),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    ProductFilterService
  ]
})
export class DashboardModule { }
