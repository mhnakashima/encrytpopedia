import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { Coin } from 'src/app/api/coin';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  coins: Coin[] = [];
  coinsObservable$: Observable<Coin[]>;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.loadCoins();
    this.startSubscribers();
    this.updateCharts();
  }

  async loadCoins(): Promise<void> {
    this.coins = await this.utilsService.getFavorites();
    this.updateCharts();
  }

  startSubscribers(): void {
    this.utilsService.getFavoritesObservable()
      .subscribe(
        response => {
          this.coins = response;
          this.updateCharts();
        }
      )
  }

  updateCharts(): void {
    const labels: Label[] = [];   
    const currentDataPrice = [];
    const currentHighPerData = []; 
    
    this.coins.forEach(coin => {      
      labels.push(coin.name);
      currentDataPrice.push(coin.currentPrice);
      currentHighPerData.push(coin.highPerDay);
    });

    this.barChartLabels = labels;
    this.barChartData = [];
    this.barChartData.push(
        {data: currentDataPrice, label: 'Preço Atual'},
        {data: currentHighPerData, label: 'Preço nas últimas 24hrs'}
      )
  }
}
