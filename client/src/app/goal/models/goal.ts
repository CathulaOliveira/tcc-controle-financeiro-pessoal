import { Category } from "src/app/category/models/cotegory";

export interface Goal {
    id?: any;
    description: String;
    type: String;
    category: Category;
    startDate: String;
    endDate: String;
    price: number;
    progress: number;
    typeTransactionExpected: String;
}