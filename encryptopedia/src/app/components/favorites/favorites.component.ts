import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Coin } from 'src/app/api/coin';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  coins: Coin[] = [];
  coinsObservable$: Observable<Coin[]>;

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.loadCoins();
    this.startSubscribers();
  }

  async loadCoins(): Promise<void> {
    this.coins = await this.utilsService.getFavorites();
  }

  startSubscribers(): void {
    this.utilsService.getFavoritesObservable()
      .subscribe(
        response => {
          this.coins = response;
        }
      )
  }

  removeFavorite(coin: Coin): void {
    this.coins = this.coins.filter((item) => item.name !== coin.name);
    this.utilsService.setFavorites(this.coins);
  }
}
