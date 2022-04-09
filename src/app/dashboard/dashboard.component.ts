import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCanViewLogs } from '../user/state/user.reducer';
import { getLoadingStatus, getProductError } from './products/state/product.reducer';
import * as ProductActions from './products/state/product.actions';
import * as TradeLogActions from './trade-logs/state/trade-log.actions';
import { ProductState } from './products/state/product.state';
import { TradeLogState } from './trade-logs/state/trade-log.state';
import { getTradeLogError } from './trade-logs/state/trade-log.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  //canViewLogs$: Observable<boolean> | undefined
  canViewLogs: boolean = false;
  productErrorMessage$: Observable<string> | undefined
  tradeLogErrorMessage$: Observable<string> | undefined
  loading$: Observable<boolean> | undefined;

  constructor(private productStore: Store<ProductState>, private tradeLogtStore: Store<TradeLogState>) { }

  ngOnInit(): void {
    //this.canViewLogs$ = this.productStore.select(getCanViewLogs);
    this.productErrorMessage$ = this.productStore.select(getProductError);
    this.loading$ = this.productStore.select(getLoadingStatus);    

    this.tradeLogErrorMessage$ = this.tradeLogtStore.select(getTradeLogError);

    this.productStore.select(getCanViewLogs).subscribe((canViewLogs: boolean) => {
      if(canViewLogs) {
        this.tradeLogtStore.dispatch(TradeLogActions.GET_TRADE_LOGS());
        this.canViewLogs = true;
      }
    })

    this.productStore.dispatch(ProductActions.GET_PRODUCTS());
  }
}
