import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { filter, Observable, of, Subscription } from 'rxjs';
import { ProductFilterService } from 'src/app/core/product-filter.service';
import { ChartProduct, Months } from 'src/app/shared/models/chart-product';
import { MonthlyPnl, Product } from 'src/app/shared/models/product';
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

export interface IXxx {
  month: string
  productData: IProductData[]
}

@Component({
  selector: 'aa-key-metrics-table',
  templateUrl: './key-metrics-table.component.html',
  styleUrls: ['./key-metrics-table.component.css']
})
export class KeyMetricsTableComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [] //= ['month'];
  dataSource = new MatTableDataSource<IXxx>()
  sub: Subscription | undefined
  selectedYear: number | undefined
  productNames: string[] = []
  months = Months;
  chartProducts: ChartProduct[] = []
  keyMetrics: IKeyMetric[] = new Array<IKeyMetric>()
  xxx: IXxx[] = new Array<IXxx>()

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

      this.productNames = [];
      this.displayedColumns = [];
      this.keyMetrics = [];

      this.chartProducts = [];
      this.xxx = [];

      this.chartProducts = chartProducts;

      

      // let chartProduct = chartProducts.find(a => a.historicalPnl?.year === year);

      // if(chartProduct) {

      //   let keyMetrics = chartProduct.historicalPnl?.monthlyPnls
      //     .map(a => <IKeyMetric>({closingPnl: a.closingPnl, month: this.months[a.month]}));

      //     console.log('sssss', keyMetrics)

      //   if(keyMetrics) {
      //     this.keyMetrics.push(...keyMetrics);
      //   }

      //   if (chartProduct.name) {
      //     this.productNames.push(chartProduct.name);
      //   }
      // }



      // chartProducts.forEach(chartProduct => {

      //   let keyMetrics = chartProduct.historicalPnl?.monthlyPnls
      //     .map(a => <IKeyMetric>({closingPnl: a.closingPnl, month: this.months[a.month], productName: chartProduct.name}));

      //   if(keyMetrics) {
      //     this.keyMetrics.push(...keyMetrics);
      //   }

      //   if (chartProduct.name) {
      //     this.productNames.push(chartProduct.name);
      //   }
      // });
      
      let months = chartProducts[0].historicalPnl?.monthlyPnls.map(a => a.month);
      

      if(months) {
        months.forEach(month => {

          let productData = new Array<IProductData>();
          chartProducts.forEach(chartProduct => {

            let data = chartProduct.historicalPnl?.monthlyPnls.filter(a => a.month === month)
              .map(a => <IProductData>({closingPnl: a.closingPnl, productName: chartProduct.name}));

              if(data)
                productData.push(...data);
          }); 
          
          this.xxx.push(<IXxx>{month: this.months[month], productData});
        })
      }

      console.log('xxx', this.xxx);
      console.log('productNames', this.productNames);

      this.productNames = <string[]>chartProducts.map(a => a.name);

      this.displayedColumns.push('month', ...this.productNames);
      this.dataSource = new MatTableDataSource(this.xxx);
    });
  }

  public doSmth(chartProduct: ChartProduct, keyMetric: IKeyMetric) {
    let xx = chartProduct.historicalPnl?.monthlyPnls.find(a => this.months[a.month] === keyMetric.month);

    return xx?.closingPnl;
  }

  // public doSmth(chartProduct: ChartProduct, month: string) {
  //   let xx = chartProduct.historicalPnl?.monthlyPnls.find(a => this.months[a.month] === month);

  //   return xx?.closingPnl;
  // }
}
