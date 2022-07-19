import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { IndrawgyApi } from './services/indrawgy.api';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [AppComponent, MainMenuComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [IndrawgyApi],
  bootstrap: [AppComponent],
})
export class AppModule {}
