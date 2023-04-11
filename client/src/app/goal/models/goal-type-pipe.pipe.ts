import { Pipe, PipeTransform } from "@angular/core";
import { GoalType } from "./goal-type";

@Pipe({
    name: 'goalTypeOptions'
  })
  export class GoalTypeOptionsPipe implements PipeTransform {
    transform(value: GoalType): string {
      switch (value) {
        case GoalType.RESULTADO:
          return 'Resultado';
        case GoalType.DESEMPENHO:
          return 'Desempenho';
        case GoalType.PROCESSO:
          return 'Processo';
        default:
          return '';
      }
    }
  }