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
  public page = 1;
  public isLoading = false;

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.loadFavorites();
    this.loadCoins();
    this.startSubscribers();
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
      this.favorites = this.favorites.filter((item) => item.name !== coin.name);
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
        if (response) {
          const coins: Coin[] = [];
          response.forEach(item => {
            const coin: Coin = new Coin(
              item.id,
              item.symbol,
              item.name,
              item.image,
              item.current_price,
              item.total_volume,
              item.high_24h,
              false
            );
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
          this.checkHasFavorites();
        }, BASICINTERVALVALUE);
      });
  }

  loadMoreCoins(): void {
    this.loadCoins();
  }

  loadFavorites(): void {
    this.favorites = this.utilsService.getFavorites();
  }

  checkHasFavorites(): void {
    if (!this.favorites) {
      return;
    }

    this.favorites.forEach(element => {
      const favorite: Coin = this.coins.find(coin => coin.id === element.id);
      if (!favorite) {
        return;
      }
      favorite.isSelected = true;
    });
  }

  startSubscribers(): void {
    this.utilsService
      .getFavoritesObservable().subscribe(
        response => {
          this.favorites = response;
          this.clearCoins();
          this.checkHasFavorites();
        }
      );
  }

  clearCoins(): void {
    this.coins.forEach(item => {
      item.isSelected = false;
    });
  }
}
