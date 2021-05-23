import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, NoPageFoundComponent],
  imports: [BrowserModule, AppRoutingModule, PagesModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
