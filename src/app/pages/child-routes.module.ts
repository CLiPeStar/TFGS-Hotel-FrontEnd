import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";


import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {Grafica1Component} from './grafic1/grafica1.component';
import {PerfilComponent} from './perfil/perfil.component';
import {ProgressComponent} from './progress/progress.component';
import {PromesasComponent} from './promesas/promesas.component';
import {RxjsComponent} from './rxjs/rxjs.component';


//Maintenance
import {UsersComponent} from './maintenances/users/users.component';
import {ReceptionistsComponent} from './maintenances/receptionists/receptionists.component';
import {HotelsComponent} from './maintenances/hotels/hotels.component';
import {ReceptionistComponent} from './maintenances/receptionists/receptionist.component';
import {SearchComponent} from './search/search.component';
import {AdminGuard} from "../guards/admin.guard";

const childRoute: Routes = [
  {path: '', component: DashboardComponent, data: {title: 'Dashboard'}},
  {
    path: 'grafica1',
    component: Grafica1Component,
    data: {title: 'Grafic #1'},
  },
  {
    path: 'progress',
    component: ProgressComponent,
    data: {title: 'Progress'},
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: {title: 'Settings Account'},
  },
  {
    path: 'promesas',
    component: PromesasComponent,
    data: {title: 'Promise'},
  },
  {path: 'rxjs', component: RxjsComponent, data: {title: 'Rxjs'}},
  {
    path: 'perfil',
    component: PerfilComponent,
    data: {title: 'User profile'},
  },
  {
    path: 'search/:chain',
    component: SearchComponent,
    data: {title: 'Search'},
  },

  //Maintenance

  {
    path: 'hotel',
    component: HotelsComponent,
    data: {title: 'Hotels'},
  },
  {
    path: 'receptionists',
    component: ReceptionistsComponent,
    data: {title: 'Receptionists'},
  },


  //Guard
  {
    path: 'user',
    canActivate: [AdminGuard],
    component: UsersComponent,
    data: {title: 'Aplication user'},
  },
  {
    path: 'receptionist/:id',
    canActivate: [AdminGuard],
    component: ReceptionistComponent,
    data: {title: 'Receptionist'},
  },
]


@NgModule({
  imports: [RouterModule.forChild(childRoute)],
  exports: [RouterModule],
})
export class ChildRoutesModule {
}
