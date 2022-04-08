import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { productReducer } from './state/product.reducer';
import { ProductEffects } from './state/product.effects';
import { TrendsComponent } from './products.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { KeyMetricsTableComponent } from './key-metrics-table/key-metrics-table.component';
import { MonthlyPnlPipe } from './key-metrics-table/monthly-pnl.pipe';

@NgModule({
  declarations: [
    TrendsComponent,
    ProductFilterComponent,
    KeyMetricsTableComponent,
    MonthlyPnlPipe
  ],
  exports: [
    TrendsComponent
  ],
  imports: [
    SharedModule,
    NgChartsModule,
    StoreModule.forFeature('productState', productReducer),
    EffectsModule.forFeature([ProductEffects]),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
