import { Pipe, PipeTransform } from "@angular/core";
import { TransactionType } from "./transaction-type";

@Pipe({
    name: 'transactionTypeOptions'
  })
  export class TransactionTypeOptionsPipe implements PipeTransform {
    transform(value: TransactionType): string {
      switch (value) {
        case TransactionType.ENTRADA:
          return 'Entrada';
        case TransactionType.SAIDA:
          return 'Saída';
        case TransactionType.TRANSFERENCIA:
          return 'Transferência entre contas';
        default:
          return '';
      }
    }
  }