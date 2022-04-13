import { Months } from 'src/app/shared/models/enums';
import { MonthlyPnlPipe } from './monthly-pnl.pipe';
import { ChartProduct } from '../../../shared/models/chart-product';
import { MonthlyPnl } from '../../../shared/models/product';
import { MonthlyData } from './key-metrics-table.component';

describe('MonthlyPnlPipe', () => {
  
  it('create an instance', () => {    
    const pipe = new MonthlyPnlPipe();
    expect(pipe).toBeTruthy();
  });

  it('pipe should return MonthlyPnl price', () => {    
    
    const pipe = new MonthlyPnlPipe();
    pipe.months = Months;

    const monthlyPnl1: MonthlyPnl = {
      month: 5,
      closingPnl: 222,
      dailyPnl: [
        { day: 1, pnl: 100 },
        { day: 2, pnl: 90 }
      ]
    }

    const chartProduct: ChartProduct = {
      name: 'product1',
      historicalPnl: {
        year: 2022,
        closingPnl: 99999.99,
        monthlyPnls: [monthlyPnl1]
      }
    }

    const keyMetric: MonthlyData = {
      month: 'May',
      productData: []
    }

    let closingPnl = pipe.transform(keyMetric, chartProduct);

    expect(closingPnl).toBe(222);
  });
});
