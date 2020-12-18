import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardDetailComponent } from './components/dashboard/dashboard-detail/dashboard-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './generics/not-found/not-found.component';
import { FavoritesComponent } from './components/favorites/favorites.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardDetailComponent,
    NotFoundComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
