import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { DashboardDetailComponent } from './components/dashboard/dashboard-detail/dashboard-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { NotFoundComponent } from './generics/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardDetailComponent,
    NotFoundComponent,
    FavoritesComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
