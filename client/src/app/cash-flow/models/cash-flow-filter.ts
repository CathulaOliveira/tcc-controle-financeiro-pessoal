import { TransactionType } from "src/app/transaction/models/transaction-type";

export interface CashFlowFilter {
    month: number;
    year: number;
    accounts: number[];
    type: TransactionType;
}