import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal-charts',
  templateUrl: './goal-charts.component.html',
  styleUrls: ['./goal-charts.component.css']
})
export class GoalChartsComponent implements OnInit {
  
  ngOnInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(() => this.loadDataAndDrawCharts());
  }

  loadDataAndDrawCharts() {
    // Suponha que você tenha esses dados de metas e dados atuais
    const metas = [
      ['Janeiro', 1500],
      ['Fevereiro', 1500],
      ['Março', 1500],
      ['Abril', 1500],
      ['Maio', 1500],
      ['Junho', 1500],
    ];
  
    const dataAtual = [
      ['Janeiro', 1000],
      ['Fevereiro', 1200],
      ['Março', 800],
      ['Abril', 1100],
      ['Maio', 1300],
      ['Junho', 1400],
    ];
  
    this.desenharGraficoLinhaPlanejadoAtualProjetado(metas, dataAtual);
  }

  desenharGraficoLinhaPlanejadoAtualProjetado(metas: any[], dataAtual: any[]) {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Planejado');
    data.addColumn('number', 'Atual');
    data.addColumn('number', 'Projetado');
  
    // Adicione os dados de metas, dados atuais e dados projetados ao DataTable
    for (let i = 0; i < metas.length; i++) {
      const mes = metas[i][0];
      const meta = metas[i][1];
      const atual = dataAtual[i][1];
      const projetado = i === 0 ? atual : (atual + meta) / 2; // Use a média para projetar
  
      data.addRow([mes, meta, atual, projetado]);
    }
  
    const options = {
      title: 'Planejado vs. Atual vs. Projetado',
      vAxis: { title: 'Valores' },
      hAxis: { title: 'Mês' },
      series: {
        0: { color: 'blue' }, // Linha azul para Planejado
        1: { color: 'green' }, // Linha verde para Atual
        2: { color: 'red' } // Linha vermelha para Projetado
      },
    };
  
    const chart = new google.visualization.LineChart(document.getElementById('graficoLinhaPlanejadoAtualProjetado'));
  
    chart.draw(data, options);
  }
  
}
