import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafic1/grafica1.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsersComponent } from './maintenances/users/users.component';
import { HotelsComponent } from './maintenances/hotels/hotels.component';
import { ReceptionistsComponent } from './maintenances/receptionists/receptionists.component';
import { PipesModule } from '../pipes/pipes.module';
import { ReceptionistComponent } from './maintenances/receptionists/receptionist.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsersComponent,
    HotelsComponent,
    ReceptionistsComponent,
    ReceptionistComponent,
    SearchComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
})
export class PagesModule {}
