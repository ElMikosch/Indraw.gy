import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';

const routes: Routes = [
  { component: MainMenuComponent, path: '' },
  { component: LoginComponent, path: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
