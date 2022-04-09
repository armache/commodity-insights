import { TradeLog } from 'src/app/shared/models/trade-log';

export interface TradeLogState {
    tradeLogs: TradeLog[];
    error: string;
}