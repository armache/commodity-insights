import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeLogsComponent } from './trade-logs.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tradelogReducer } from './state/trade-log.reducer';



@NgModule({
  declarations: [
    TradeLogsComponent
  ],
  exports:[
    TradeLogsComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('tradeLogState', tradelogReducer),
    EffectsModule.forFeature([]),
  ]
})
export class TradeLogsModule { }
