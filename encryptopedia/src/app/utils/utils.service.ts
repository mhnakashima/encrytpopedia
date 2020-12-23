import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Coin } from '../api/coin';
import { APIENDPOINT, COINCASELOCALSTORAGE, CURRENCY_BRL } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  favoritesSubject$ = new Subject<Coin[]>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getCoins(page: number = 1, perPage: number = 20): Promise<any> {
    const params = new HttpParams()
      .append('vs_currency', CURRENCY_BRL)
      .append('per_page', perPage.toString())
      .append('page', page.toString());
    return this.http.get<Coin[]>(`${APIENDPOINT}coins/markets`, { params }).toPromise();
  }

  public getFavoritesObservable(): Observable<Coin[]> {
    return this.favoritesSubject$.asObservable();
  }

  public setFavorites(coins: Coin[]): void {
    window.localStorage.setItem(COINCASELOCALSTORAGE, JSON.stringify(coins));
    this.favoritesSubject$.next(coins);
  }

  public getFavorites(): Coin[] {
    return JSON.parse(window.localStorage.getItem(COINCASELOCALSTORAGE)) || [];
  }

  public redirectToPage(page: string): void {
    this.router.navigate([page]);
  }
}
