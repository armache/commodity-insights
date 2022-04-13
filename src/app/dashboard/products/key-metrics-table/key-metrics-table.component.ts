import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ChartProduct } from 'src/app/shared/models/chart-product';
import { Months } from 'src/app/shared/models/enums';
import { Product } from 'src/app/shared/models/product';
import { ProductFilterService } from '../product-filter/product-filter.service';
import { getProductsByYear } from '../state/product.reducer';

export interface ProductData {
  closingPnl: number
  productName: string
}

export interface MonthlyData {
  month: string
  productData: ProductData[]
}

@Component({
  selector: 'aa-key-metrics-table',
  templateUrl: './key-metrics-table.component.html',
  styleUrls: ['./key-metrics-table.component.css']
})
export class KeyMetricsTableComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<MonthlyData>()
  sub: Subscription | undefined
  selectedYear: number | undefined
  productNames: string[] = []
  months = Months;
  chartProducts: ChartProduct[] = []
  monthlyData: MonthlyData[] = new Array<MonthlyData>()

  constructor(private store: Store<Product>, private productFilterService: ProductFilterService) { }

  ngOnInit(): void {
    this.sub = this.productFilterService.selectedYearSubject$.subscribe(year => this.selectedYear = year);
    this.productFilterService.selectedYearSubject$.subscribe(year => {
      if (year) {
        this.getProductsFilteredByYear(year);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private getProductsFilteredByYear(year: number) {

    this.store.select(getProductsByYear(year)).subscribe((chartProducts: ChartProduct[]) => {

      if (chartProducts && chartProducts.length > 0) {
        this.productNames = [];
        this.displayedColumns = [];

        this.chartProducts = [];
        this.monthlyData = [];

        this.chartProducts = chartProducts;

        let months = chartProducts[0].historicalPnl?.monthlyPnls.map(a => a.month);

        if (months) {
          months.forEach(month => {

            let productData = new Array<ProductData>();
            chartProducts.forEach(chartProduct => {

              let data = chartProduct.historicalPnl?.monthlyPnls.filter(a => a.month === month)
                .map(a => <ProductData>({ closingPnl: a.closingPnl, productName: chartProduct.name }));

              if (data)
                productData.push(...data);
            });

            this.monthlyData.push(<MonthlyData>{ month: this.months[month], productData });
          })
        }

        this.productNames = <string[]>chartProducts.map(a => a.name);

        this.displayedColumns.push('month', ...this.productNames);
        this.dataSource = new MatTableDataSource(this.monthlyData);
      }
    });
  }
}
