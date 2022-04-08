import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCanViewCharts } from '../user/state/user.reducer';
import { getLoadingStatus, getProductError } from './state/product.reducer';
import * as ProductActions from '../dashboard/state/product.actions';
import { ProductState } from './state/product.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  canViewCharts$: Observable<boolean> | undefined
  errorMessage$: Observable<string> | undefined
  loading$: Observable<boolean> | undefined;

  constructor(private store: Store<ProductState>) { }

  ngOnInit(): void {
    this.canViewCharts$ = this.store.select(getCanViewCharts);
    this.errorMessage$ = this.store.select(getProductError);
    this.loading$ = this.store.select(getLoadingStatus);

    this.store.dispatch(ProductActions.GET_PRODUCTS());
  }
}
