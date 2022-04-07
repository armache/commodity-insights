import { HistoricalPnl, MonthlyPnl } from "./product"

export class ChartProduct {
    name: string | undefined
    historicalPnl: HistoricalPnl | undefined
}

export enum Months {
    'Jan' = 1,
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
}
