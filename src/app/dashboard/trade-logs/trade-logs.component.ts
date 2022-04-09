import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTradeLogs } from './state/trade-log.reducer';
import { TradeLogState } from './state/trade-log.state';

@Component({
  selector: 'aa-trade-logs',
  templateUrl: './trade-logs.component.html',
  styleUrls: ['./trade-logs.component.css']
})
export class TradeLogsComponent implements OnInit {

  constructor(private store: Store<TradeLogState>) { }

  ngOnInit(): void {
    this.store.select(getTradeLogs).subscribe(a => console.log('trade logs: ', a));
  }

}
