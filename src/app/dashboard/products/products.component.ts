import { Component, ViewChild, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ChartProduct } from 'src/app/shared/models/chart-product';
import { Months } from 'src/app/shared/models/enums';
import { MonthlyPnl, Product } from 'src/app/shared/models/product';
import { ProductFilterService } from './product-filter/product-filter.service';
import { getProductsByYear } from './state/product.reducer';

@Component({
  selector: 'aa-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy {

  months = Months;
  yearSub: Subscription | undefined;
  toggleSub: Subscription | undefined;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartType: ChartType = 'line';

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
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
    plugins: {
      tooltip: {
          callbacks: {
              label: function(context) {
                  let label = context.dataset.label || '';

                  if (label) {
                      label += ': ';
                  }
                  if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(context.parsed.y);
                  }
                  return label;
              }
          }
      },
      legend: {
        onClick: function (e) {
          return false
        }
      }
    }
  };

  constructor(private store: Store<Product>, private productFilterService: ProductFilterService) { }

  ngOnInit(): void {

    this.yearSub = this.productFilterService.selectedYearSubject$.subscribe((year: number) => {
      this.getProductsFilteredByYear(year);
    });

    this.toggleSub = this.productFilterService.productToggleSubject$.subscribe((productName: string) => {
      this.showHideProductChart(productName);
    });
  }

  ngOnDestroy(): void {
    this.yearSub?.unsubscribe();
    this.toggleSub?.unsubscribe();
  }

  private getProductsFilteredByYear(year: number) {
    this.store.select(getProductsByYear(year)).subscribe((chartProducts: ChartProduct[]) => {

      if (chartProducts && chartProducts.length > 0) {
        this.lineChartData.labels = [];
        this.lineChartData.datasets = [];

        chartProducts[0].historicalPnl?.monthlyPnls?.forEach((item: MonthlyPnl) => {
          this.lineChartData.labels?.push(this.months[item.month]);
        });

        chartProducts.forEach(chartProduct => {
          if (chartProduct.historicalPnl) {
            let monthlyClosingPnlList = chartProduct.historicalPnl.monthlyPnls.map(a => a.closingPnl);
            this.lineChartData.datasets.push({ data: monthlyClosingPnlList, label: chartProduct.name });
          }
        });

        this.chart?.update();
      }
    });
  }

  private showHideProductChart(productName: string) {

    let productIndex = this.lineChartData.datasets.findIndex(a => a.label === productName);
    let isHidden = this.chart?.isDatasetHidden(productIndex);
    this.chart?.hideDataset(productIndex, !isHidden);
  }
}
