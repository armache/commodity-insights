import { TradeLog } from 'src/app/shared/models/trade-log';

export interface TradeLogState {
    tradelogs: TradeLog[];
    error: string;
}