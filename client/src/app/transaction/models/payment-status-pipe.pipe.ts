import { Pipe, PipeTransform } from "@angular/core";
import { PaymentStatus } from "./payment-status";

@Pipe({
    name: 'paymentStatusOptions'
  })
export class PaymentStatusOptionsPipe implements PipeTransform {
    transform(value: PaymentStatus): string {
        switch (value) {
        case PaymentStatus.PENDENTE:
            return 'Pendente';
        case PaymentStatus.EFETUADO:
            return 'Efetuado';
        default:
            return '';
        }
    }
}