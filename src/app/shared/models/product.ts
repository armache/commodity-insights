export interface Product {
    modelName: string
    commodityName: string
    historicalPnl: HistoricalPnl[]
}

export interface HistoricalPnl {
    year: number
    closingPnl: number
    monthlyPnls: MonthlyPnl[]
}

export interface MonthlyPnl {
     month: number
     closingPnl: number
     dailyPnl: DailyPnl[]
}

export interface DailyPnl {
    day: number
    pnl: number   
}