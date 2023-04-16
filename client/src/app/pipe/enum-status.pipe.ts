import { Pipe, PipeTransform } from "@angular/core";
import { Status } from "../enum/status";

@Pipe({
    name: 'enumStatusOptions'
  })
  export class EnumStatusOptionsPipe implements PipeTransform {
    transform(value: Status): string {
      switch (value) {
        case Status.ATIVO:
          return 'Ativo';
        case Status.INATIVO:
          return 'Inativo';
        default:
          return '';
      }
    }
  }