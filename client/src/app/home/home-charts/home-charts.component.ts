import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-home-charts',
  templateUrl: './home-charts.component.html',
  styleUrls: ['./home-charts.component.css']
})
export class HomeChartsComponent implements OnInit, OnChanges {
  
  @Input() dadosGraficoPizza: any;
  @Input() dadosGraficoColuna: any;
  @Input() dadosGraficoBarra: any;

  ngOnInit() {
    google.charts.load('current', { 'packages': ['corechart'] }); // Carrega o pacote de gráficos 'corechart'
    google.charts.setOnLoadCallback(() => this.desenharGraficos()); // Chama a função para desenhar o gráfico quando a biblioteca estiver pronta
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dadosGraficoPizza'] && !changes['dadosGraficoPizza'].isFirstChange()) {
      this.desenharGraficoPizza();
    }
    if (changes['dadosGraficoColuna'] && !changes['dadosGraficoColuna'].isFirstChange()) {
      this.desenharGraficoColuna();
    }
    if (changes['dadosGraficoBarra'] && !changes['dadosGraficoBarra'].isFirstChange()) {
      this.desenharGraficoBarra();
    }
  }

  desenharGraficos() {
    // total gasto por categoria
    this.desenharGraficoPizza();
    // total por tipo de transações
    this.desenharGraficoColuna();
    // Desempenho no mes
    this.desenharGraficoBarra();
  }

  desenharGraficoPizza() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Categoria');
    data.addColumn('number', 'Quantidade de transações');

    this.dadosGraficoPizza.forEach(item => {
      data.addRow([item.label, item.value]);
    });
  
    const options = {
      title: 'Transações por Categorias',
      pieHole: 0.4, // Define um buraco no centro para criar um gráfico de pizza donut
    };

    const chart = new google.visualization.PieChart(document.getElementById('graficoPizza'));
    chart.draw(data, options);
  }

  desenharGraficoColuna() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Tipo');
    data.addColumn('number', 'Valor');

    this.dadosGraficoColuna.forEach(item => {
      data.addRow([item.label, item.valueDecimal]);
    });

    const options = {
      title: 'Valor total por Tipo de Transações',
      vAxis: { title: 'Valor' },
      hAxis: { title: 'Tipo' }
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('graficoColuna'));

    chart.draw(data, options);
  }

  desenharGraficoLinhas() {
    const data = google.visualization.arrayToDataTable([
      ['Mês', 'Vendas'],
      ['Janeiro', 1000],
      ['Fevereiro', 1200],
      ['Março', 800],
      ['Abril', 1500]
    ]);

    const options = {
      title: 'Desempenho de Vendas Mensal',
      vAxis: { title: 'Vendas' },
      hAxis: { title: 'Mês' }
    };

    const chart = new google.visualization.LineChart(document.getElementById('graficoLinhas'));

    chart.draw(data, options);
  }

  desenharGraficoBarra() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Categoria');
    data.addColumn('number', 'Total de Entradas');
    data.addColumn('number', 'Total de Saídas');
  
    this.dadosGraficoBarra.forEach(item => {
      data.addRow([
        item.label,
        item.totalEntradas,
        item.totalSaidas
      ]);
    });
  
    const options = {
      title: 'Total de Entradas e Saídas por Categoria',
      vAxis: { title: 'Categoria' },
      hAxis: { title: 'Valor' },
      seriesType: 'bars',
      series: { 1: { type: 'bars' } },
      height: this.dadosGraficoPizza.length * 100 + 100 // Ajustar a altura com base no número de categorias
    
    };
  
    const chart = new google.visualization.BarChart(document.getElementById('graficoBarra'));
  
    chart.draw(data, options);
  }

}
