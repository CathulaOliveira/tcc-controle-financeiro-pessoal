import { RecurringTransaction } from "src/app/transaction/models/transaction-recurring";

export interface CashFlow {
    transactions: RecurringTransaction[];
    totalEntradasPrevistas: number;
    totalSaidasPrevistas: number;
}