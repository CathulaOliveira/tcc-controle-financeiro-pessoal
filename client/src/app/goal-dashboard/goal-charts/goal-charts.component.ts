import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-goal-charts',
  templateUrl: './goal-charts.component.html',
  styleUrls: ['./goal-charts.component.css']
})
export class GoalChartsComponent {

  @Input() dadosGrafico: any;
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['dadosGrafico'] && !changes['dadosGrafico'].isFirstChange() && this.dadosGrafico != null && this.dadosGrafico.price != null) {
      this.loadDataAndDrawCharts();
    }
  }

  loadDataAndDrawCharts() {

    this.dadosGrafico.startDate = new Date(this.dadosGrafico.startDate);
    this.dadosGrafico.endDate = new Date(this.dadosGrafico.endDate);

    const { metas, dataAtual, dataProjetada } = this.calcularDadosMensais(
      this.dadosGrafico.startDate,
      this.dadosGrafico.endDate,
      this.dadosGrafico.price,
      this.dadosGrafico.transactions
    );

    this.desenharGraficoLinhaPlanejadoAtualProjetado(metas, dataAtual, dataProjetada);
  }

  calcularDadosMensais(inicio, termino, metaTotal, entradasSaidas) {
    const metas = [];
    const dataAtual = [];
    const dataProjetada = [];

    let metaAcumulada = 0;

    const mesAtual = new Date(inicio);
    let valorAtual = 0;

    while (mesAtual <= termino) {
      const mes = mesAtual.toLocaleDateString('pt-BR', { month: 'long' });

      // Calcular a meta mensal com base no valor acumulado
      const metaMensal = metaTotal / (this.diferencaDeMeses(termino, inicio) + 1);

      metas.push([mes, metaAcumulada]);

      // Calcular o valor atual para o mês
      const entradasSaidasNoMes = entradasSaidas.filter((item) => {
        const dataItem = new Date(item.data);
        return (
          dataItem.getFullYear() === mesAtual.getFullYear() &&
          dataItem.getMonth() === mesAtual.getMonth()
        );
      });
      const valorMesAtual = entradasSaidasNoMes.reduce((total, item) => total + item.valor, 0);
      valorAtual += valorMesAtual;

      dataAtual.push([mes, valorAtual]);

      // Calcular o valor projetado para o mês
      let projetado = valorAtual;

      // Se o valor atual for menor que o esperado, atualizar o projetado
      if (valorAtual < metaAcumulada) {
        projetado = (metaAcumulada - valorAtual) / 2 + valorAtual;
      }

      dataProjetada.push([mes, projetado]);

      // Atualizar a meta acumulada
      metaAcumulada += metaMensal;

      mesAtual.setMonth(mesAtual.getMonth() + 1);
    }

    return { metas, dataAtual, dataProjetada };
  }

  diferencaDeMeses(data1, data2) {
    return (data1.getFullYear() - data2.getFullYear()) * 12 + (data1.getMonth() - data2.getMonth());
  }

  desenharGraficoLinhaPlanejadoAtualProjetado(metas, dataAtual, dataProjetada) {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Esperado');
    data.addColumn('number', 'Atual');
    data.addColumn('number', 'Projetado');

    for (let i = 0; i < metas.length; i++) {
      const mes = metas[i][0];
      const esperado = metas[i][1];
      const atual = dataAtual[i][1];
      const projetado = dataProjetada[i][1];

      data.addRow([mes, esperado, atual, projetado]);
    }

    const options = {
      title: 'Esperado vs. Atual vs. Projetado',
      vAxis: { title: 'Valores' },
      hAxis: { title: 'Mês' },
      series: {
        0: { color: 'blue' }, // Linha azul para Esperado
        1: { color: 'green' }, // Linha verde para Atual
        2: { color: 'red' } // Linha vermelha para Projetado
      },
    };

    const chart = new google.visualization.LineChart(
      document.getElementById('graficoLinhaPlanejadoAtualProjetado')
    );

    chart.draw(data, options);
  }
}
