import { Account } from "src/app/account/models/account";
import { Category } from "src/app/category/models/cotegory";
import { TransactionType } from "./transaction-type";
import { PaymentStatus } from "./payment-status";

export interface RecurringTransaction {
    id?: any;
    accountOrigin: Account;
    accountDestination: Account;
    category: Category;
    price: number;
    pricePaid: number;
    description: String;
    type: TransactionType;
    dueDate: String;
    datePaid: String;
    paymentStatus: PaymentStatus;
}