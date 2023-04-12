import { Account } from "src/app/account/models/account";
import { Category } from "src/app/category/models/cotegory";
import { TransactionType } from "./transaction-type";

export interface Transaction {
    id?: any;
    accountOrigin: Account;
    accountDestination: Account;
    category: Category;
    price: number;
    description: String;
    date: String;
    type: TransactionType;
}