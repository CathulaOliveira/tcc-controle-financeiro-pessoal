import { TransactionType } from "src/app/transaction/models/transaction-type";

export interface ReportFilter {
    dateInit: String;
    dateFinish: String;
    accounts: number[];
    categories: number[];
    type: TransactionType;
}