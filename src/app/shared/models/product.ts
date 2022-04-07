export class Product {
    modelName: string | undefined
    commodityName: string | undefined
    historicalPnl: HistoricalPnl[] = new Array<HistoricalPnl>();
}

export class HistoricalPnl {
    year: number = 0
    closingPnl: number | undefined
    monthlyPnls: MonthlyPnl[] = new Array<MonthlyPnl>();

    // constructor(historicalPnl: HistoricalPnl) {
    //     if(historicalPnl) {
    //         this.year = historicalPnl.year;
    //         this.closingPnl = historicalPnl.closingPnl;
    //         this.monthlyPnl = historicalPnl.monthlyPnl;
    //     }
    // } 
}

export class MonthlyPnl {
     month: number = 0
     closingPnl: number = 0
     dailyPnl: DailyPnl[] = new Array<DailyPnl>();
}

export class DailyPnl {
    day: number | undefined
    pnl: number | undefined   
}