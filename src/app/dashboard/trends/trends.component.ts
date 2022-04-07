import { Component, ViewChild, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ProductFilterService } from 'src/app/core/product-filter.service';
import { ChartProduct, Months } from 'src/app/shared/models/chart-product';
import { MonthlyPnl, Product } from 'src/app/shared/models/product';
import { getProductsByYear } from '../state/product.reducer';

@Component({
  selector: 'aa-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrendsComponent implements OnInit, OnDestroy {

  months = Months;
  yearSub: Subscription | undefined;
  toggleSub: Subscription | undefined;
  //toggleResetSub: Subscription | undefined;
  
  constructor(private store: Store<Product>, private productFilterService: ProductFilterService) { }
  
  ngOnInit(): void {
    this.yearSub = this.productFilterService.selectedYearSubject$.subscribe((year: number) => {
      this.getProductsFilteredByYear(year);
    });

    this.toggleSub = this.productFilterService.productToggleSubject$.subscribe((productName: string) => {
      this.showHideProductChart(productName);
    });

    // this.toggleResetSub = this.productFilterService.resetProductTogglesSubject$.subscribe(() => {
    //   this.showAllChartProducts();
    // });
  }

  ngOnDestroy(): void {
    this.yearSub?.unsubscribe();
    this.toggleSub?.unsubscribe();
    //this.toggleResetSub?.unsubscribe();
  }

  // private showAllChartProducts() {
  //   console.log('showAllChartProducts', this.lineChartData.datasets);
  //   for(let i = 0; i < this.lineChartData.datasets.length; i++) {
  //     console.log('index: ' + i)
  //     console.log('chart: ', this.chart)
  //     let isHidden = this.chart?.isDatasetHidden(i);
  //     console.log('isHidden: ' + isHidden);

  //     if(!isHidden || isHidden == null) {
  //       //this.chart?.hideDataset(i, !isHidden);
  //       console.log('found hidden');
  //       this.productFilterService.toggleProduct(this.lineChartData.datasets[i].label + '');
  //     }
  //   }
  // }

  private showHideProductChart(productName: string) {

    let productIndex = this.lineChartData.datasets.findIndex(a => a.label === productName);
    console.log('productIndex', productIndex);

    let isHidden = this.chart?.isDatasetHidden(productIndex);
    this.chart?.hideDataset(productIndex, !isHidden);
  }

  private getProductsFilteredByYear(year: number) {
    this.store.select(getProductsByYear(year)).subscribe((chartProducts: ChartProduct[]) => {

      this.lineChartData.labels = [];
      this.lineChartData.datasets = [];

      console.log('1: ', chartProducts);

      chartProducts[0].historicalPnl?.monthlyPnls?.forEach((item: MonthlyPnl) => {
        this.lineChartData.labels?.push(this.months[item.month]);
      });
   
      chartProducts.forEach(chartProduct => {
        if(chartProduct.historicalPnl){
          let monthlyClosingPnlList = chartProduct.historicalPnl.monthlyPnls.map(a => a.closingPnl);
          this.lineChartData.datasets.push({data: monthlyClosingPnlList, label: chartProduct.name});
        }
      });

      this.chart?.update();
    });
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      // {
      //   //data: [ 65, 59, 80, 81, 56, 55, 40 ],
      //   data:[],
      //   label: 'Series A',
      //   backgroundColor: 'rgba(148,159,177,0.2)',
      //   borderColor: 'rgba(148,159,177,1)',
      //   pointBackgroundColor: 'rgba(148,159,177,1)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      //   fill: 'origin',
      // },
      // {
      //   //data: [ 28, 48, 40, 19, 86, 27, 90 ],
      //   data: [],
      //   label: 'Series B',
      //   backgroundColor: 'rgba(77,83,96,0.2)',
      //   borderColor: 'rgba(77,83,96,1)',
      //   pointBackgroundColor: 'rgba(77,83,96,1)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgba(77,83,96,1)',
      //   fill: 'origin',
      // },
      // {
      //   //data: [ 180, 480, 770, 90, 1000, 270, 400 ],
      //   data: [],
      //   label: 'Series C',
      //   yAxisID: 'y-axis-1',
      //   backgroundColor: 'rgba(255,0,0,0.3)',
      //   borderColor: 'red',
      //   pointBackgroundColor: 'rgba(148,159,177,1)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      //   fill: 'origin',
      // }
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    // plugins: {
    //   legend: { display: true },
    //   annotation: {
    //     annotations: [
    //       {
    //         type: 'line',
    //         scaleID: 'x',
    //         value: 'March',
    //         borderColor: 'orange',
    //         borderWidth: 2,
    //         label: {
    //           position: 'center',
    //           enabled: true,
    //           color: 'orange',
    //           content: 'LineAnno',
    //           font: {
    //             weight: 'bold'
    //           }
    //         }
    //       },
    //     ],
    //   }
    // }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }
}
