import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ChartProduct, Months } from 'src/app/shared/models/chart-product';
import { Product } from 'src/app/shared/models/product';
import { ProductFilterService } from '../product-filter/product-filter.service';
import { getProductsByYear } from '../state/product.reducer';

export interface IKeyMetric {
  month: string
  closingPnl: number
  productName: string
}

export interface IProductData {
  closingPnl: number
  productName: string
}

export interface IMonthlyData {
  month: string
  productData: IProductData[]
}

@Component({
  selector: 'aa-key-metrics-table',
  templateUrl: './key-metrics-table.component.html',
  styleUrls: ['./key-metrics-table.component.css']
})
export class KeyMetricsTableComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<IMonthlyData>()
  sub: Subscription | undefined
  selectedYear: number | undefined
  productNames: string[] = []
  months = Months;
  chartProducts: ChartProduct[] = []
  keyMetrics: IKeyMetric[] = new Array<IKeyMetric>()
  monthlyData: IMonthlyData[] = new Array<IMonthlyData>()

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
        this.keyMetrics = [];

        this.chartProducts = [];
        this.monthlyData = [];

        this.chartProducts = chartProducts;

        let months = chartProducts[0].historicalPnl?.monthlyPnls.map(a => a.month);

        if (months) {
          months.forEach(month => {

            let productData = new Array<IProductData>();
            chartProducts.forEach(chartProduct => {

              let data = chartProduct.historicalPnl?.monthlyPnls.filter(a => a.month === month)
                .map(a => <IProductData>({ closingPnl: a.closingPnl, productName: chartProduct.name }));

              if (data)
                productData.push(...data);
            });

            this.monthlyData.push(<IMonthlyData>{ month: this.months[month], productData });
          })
        }

        this.productNames = <string[]>chartProducts.map(a => a.name);

        this.displayedColumns.push('month', ...this.productNames);
        this.dataSource = new MatTableDataSource(this.monthlyData);
      }
    });
  }

  public doSmth(chartProduct: ChartProduct, keyMetric: IKeyMetric) {
    let monthlyPnl = chartProduct.historicalPnl?.monthlyPnls.find(a => this.months[a.month] === keyMetric.month);

    return monthlyPnl?.closingPnl;
  }
}
