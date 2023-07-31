import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  ngOnInit() {
    google.charts.load('current', { 'packages': ['corechart'] }); // Carrega o pacote de gráficos 'corechart'
    google.charts.setOnLoadCallback(() => this.desenharGraficos()); // Chama a função para desenhar o gráfico quando a biblioteca estiver pronta
  }

  desenharGraficos() {
    this.desenharGraficoPizza();
    this.desenharGraficoColunas();
    this.desenharGraficoLinhas();
  }

  desenharGraficoPizza() {
    const data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Sleep', 7],
      ['Other', 4]
    ]);
  
    const options = {
      title: 'My Daily Activities',
      pieHole: 0.4 // Define um buraco no centro para criar um gráfico de pizza donut
    };
  
    const chart = new google.visualization.PieChart(document.getElementById('graficoPizza'));
  
    chart.draw(data, options);
  }

  desenharGraficoColunas() {
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

    const chart = new google.visualization.ColumnChart(document.getElementById('graficoColunas'));

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

}
