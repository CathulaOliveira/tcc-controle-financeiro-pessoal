import { TransactionType } from "src/app/transaction/models/transaction-type";

export interface DashboardFilter {
    month: number;
    year: number;
    accounts: number[];
    categories: number[];
    type: TransactionType;
}