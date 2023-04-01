import { Pipe, PipeTransform } from "@angular/core";
import { AccountType } from "./account-type";

@Pipe({
    name: 'accountTypeOptions'
  })
  export class AccountTypeOptionsPipe implements PipeTransform {
    transform(value: AccountType): string {
      switch (value) {
        case AccountType.CONTA_CORRENTE:
          return 'Conta Corrente';
        case AccountType.CONTA_POUPANCA:
          return 'Conta Poupança';
        case AccountType.CARTAO:
          return 'Cartão';
        default:
          return '';
      }
    }
  }