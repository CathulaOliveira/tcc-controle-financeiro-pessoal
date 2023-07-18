import { RecurringTransaction } from "src/app/transaction/models/transaction-recurring";

export interface CashFlow {
    transactions: RecurringTransaction[];
    totalEntradasPrevistas: number;
    totalEntradasRealizadas: number;
    totalSaidasPrevistas: number;
    totalSaidasRealizadas: number;
    totalSaldoPrevisto: number;
    totalSaldoRealizado: number;
}