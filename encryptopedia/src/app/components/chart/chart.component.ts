import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Coin } from 'src/app/api/coin';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() coin: Coin;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];

  constructor() { }

  ngOnInit(): void {
    this.updateCharts();
  }

  updateCharts(): void {
    if (!this.coin) {
      return;
    }

    const labels: Label[] = [];
    const currentDataPrice = [];
    const currentHighPerData = [];

    labels.push(this.coin.name);
    currentDataPrice.push(this.coin.currentPrice);
    currentHighPerData.push(this.coin.highPerDay);

    this.barChartLabels = labels;
    this.barChartData = [];
    this.barChartData.push(
      { data: currentDataPrice, label: 'Preço Atual' },
      { data: currentHighPerData, label: 'Preço nas últimas 24hrs' }
    )
  }
}
