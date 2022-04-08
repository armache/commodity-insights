import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getAvailableYears, getProductNames } from '../state/product.reducer';
import { ProductState } from '../state/product.state';
import { ProductFilterService } from './product-filter.service';

@Component({
  selector: 'aa-product-filter',
  templateUrl: './product-filter.component.html'
})
export class ProductFilterComponent implements OnInit, OnDestroy {

  selectedYear: number | undefined
  years$: Observable<Number[]> | undefined
  productNames$: Observable<string[]> | undefined
  subYear: Subscription | undefined
  //subProductChecked: Subscription | undefined
  allProducts = new FormControl();
  
  productChecked: boolean = true;

  constructor(private store: Store<ProductState>, public productFilterService: ProductFilterService) { }
  
  ngOnInit(): void {
    this.productFilterService.setDefaultFilterValues();
    this.years$ = this.store.select(getAvailableYears);
    this.productNames$ = this.store.select(getProductNames);

    this.subYear = this.productFilterService.selectedYearSubject$.subscribe(year => this.selectedYear = year);
    this.showAllProductsOnChart();
  }

  ngOnDestroy(): void {
    this.subYear?.unsubscribe();
  }

  productYearChanged($evt: string) {
    console.log('$evt: ' + $evt)
    this.productFilterService.changeYearFilter(+$evt);
    this.showAllProductsOnChart();
  }

  showHideProduct(productName: string) {
    this.productFilterService.toggleProduct(productName);
  }

  showAllProductsOnChart() {
    this.allProducts.setValue(true);
  }
}
