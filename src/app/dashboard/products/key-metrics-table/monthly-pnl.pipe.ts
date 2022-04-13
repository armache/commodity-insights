import { Pipe, PipeTransform } from '@angular/core';
import { ChartProduct } from 'src/app/shared/models/chart-product';
import { Months } from 'src/app/shared/models/enums';
import { MonthlyData } from './key-metrics-table.component';

@Pipe({
  name: 'monthlyPnl'
})
export class MonthlyPnlPipe implements PipeTransform {

  months = Months;
  
  transform(keyMetric: MonthlyData, chartProduct: ChartProduct): number | undefined {

    let monthlyPnl = chartProduct.historicalPnl.monthlyPnls.find(a => this.months[a.month] === keyMetric.month);
    return monthlyPnl?.closingPnl;
  }

}
