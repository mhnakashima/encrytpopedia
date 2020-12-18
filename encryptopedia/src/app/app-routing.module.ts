import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDetailComponent } from './components/dashboard/dashboard-detail/dashboard-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './generics/not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, data: { animation: 'Dashboard' } },
  { path: 'details/:name', component: DashboardDetailComponent, data: { animation: 'ContactView' } },
  { path: '404', component: NotFoundComponent, data: { animation: '404' } },
  { path: '**', redirectTo: '/404', data: { animation: 'Dashboard' } }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
