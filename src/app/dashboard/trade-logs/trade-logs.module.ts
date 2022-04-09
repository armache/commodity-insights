import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeLogsComponent } from './trade-logs.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tradeLogReducer } from './state/trade-log.reducer';
import { TradeLogEffects } from './state/trade-log.effects';



@NgModule({
  declarations: [
    TradeLogsComponent
  ],
  exports:[
    TradeLogsComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('tradeLogState', tradeLogReducer),
    EffectsModule.forFeature([TradeLogEffects]),
  ]
})
export class TradeLogsModule { }
