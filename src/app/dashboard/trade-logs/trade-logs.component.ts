import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { TradeLog } from 'src/app/shared/models/trade-log';
import { getTradeLogs } from './state/trade-log.reducer';
import { TradeLogState } from './state/trade-log.state';

@Component({
  selector: 'aa-trade-logs',
  templateUrl: './trade-logs.component.html',
  styleUrls: ['./trade-logs.component.css']
})
export class TradeLogsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  dataSource = new MatTableDataSource<TradeLog>();
  displayedColumns: string[] = ['model', 'commodity', 'date', 'contract', 'price', 'position', 'newTradeAction', 'pnlDaily'];

  constructor(private store: Store<TradeLogState>) { }

  ngOnInit(): void {

    const sortState: Sort = {active: 'name', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);

    this.store.select(getTradeLogs).subscribe((tradeLogs: TradeLog[]) => {
      if (tradeLogs && tradeLogs.length > 0) {
        this.dataSource = new MatTableDataSource(tradeLogs)
        this.dataSource.sort = this.sort;
      }
    });
  }
}
