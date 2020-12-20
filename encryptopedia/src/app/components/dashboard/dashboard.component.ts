import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/api/coin';
import { BASICINTERVALVALUE, MAX_FAVORITES } from 'src/app/config/constants';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public coins: Coin[] = [];
  public favorites: Coin[] = [];
  public page: number = 1;
  public isLoading: boolean = false;

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.loadCoins();
  }

  public addFavorite(coin: Coin): void {

    if (!coin.isSelected) {

      if (this.hasRepeatedCoin(coin)) {
        return;
      }

      if (this.favorites.length >= MAX_FAVORITES) {
        return;
      } else {
        this.favorites.push(coin);
      }
    } else {
      this.favorites = this.favorites.filter((item) => { return item.name !== coin.name });
    }
    coin.isSelected = !coin.isSelected;
    this.utilsService.setFavorites(this.favorites);
  }

  public hasRepeatedCoin(coin: Coin): boolean {
    return this.favorites.find(item => item?.name === coin?.name) === null;
  }

  loadCoins(): void {
    this.isLoading = true;
    this.utilsService.getCoins(this.page)
      .then(response => {
        if(response){
          const coins: Coin[] = [];
          response.forEach(item => {
            const coin: Coin = new Coin(item.id, item.symbol, item.name, item.image, item.current_price, item.total_volume, item.high_24h, false);
            coins.push(coin);
          });
          return coins;
        }
      })
      .then(
        (response) => {
          this.coins = [...this.coins, ...response];
        },
        (reject) => {
          console.log(reject);
          throw new Error(reject);
        }
      )
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setTimeout(() => {
          this.isLoading = false;
          this.page++;
        }, BASICINTERVALVALUE);
      })
  }

  loadMoreCoins(): void {
    this.loadCoins();
  }
}
