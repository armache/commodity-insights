import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TrendsComponent } from './trends/trends.component';
import { RecentMovementComponent } from './recent-movement/recent-movement.component';
import { NgChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from './state/product.reducer';
import { ProductEffects } from './state/product.effects';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeyMetricsTableComponent } from './key-metrics-table/key-metrics-table.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TrendsComponent,
    RecentMovementComponent,
    ProductFilterComponent,
    KeyMetricsTableComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    NgChartsModule,
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects]),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
