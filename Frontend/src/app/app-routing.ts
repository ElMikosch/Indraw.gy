import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main-screen/main-screen.component').then(
        (mod) => mod.MainScreenComponent
      ),
  },
  {
    path: 'register/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/main-menu/main-menu.component').then(
        (mod) => mod.MainMenuComponent
      ),
  },
];
