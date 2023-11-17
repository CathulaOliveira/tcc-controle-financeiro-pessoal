import { GoalTransactions } from "./goal-transactions";

export interface GoalDashboard {
    percentage: number;
    startDate: String;
    endDate: String;
    price: number;
    transactions: GoalTransactions[];
}