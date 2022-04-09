export interface TradeLog {
    modelName: string
    commodityName: string
    date: Date
    contract: string
    price: number
    position: number
    newTradeAction: number
    pnlDaily: number
}