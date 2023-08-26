import { ChartType } from "angular-google-charts";

export interface Dashboard {
    totalSaldo: number;
    totalEntradas: number;
    totalSaidas: number;
    totalBalanco: number;
    graficoPizza: [];
    graficoColuna: any;
    graficoBarra: any;
}