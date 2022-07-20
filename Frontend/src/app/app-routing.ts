import { Routes } from '@angular/router';
import { MainClientOnlyGuard } from './guards/main-client-only.guard';
import { RegisteredPlayerOnlyGuard } from './guards/registered-player-only.guard';
import { PlayerAlreadyInGameGuard } from './guards/player-already-in-game.guard';
import { MainMenuGuard } from './guards/main-menu.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [MainMenuGuard],
    loadComponent: () =>
      import('./pages/main-menu/main-menu.component').then(
        (mod) => mod.MainMenuComponent
      ),
  },
  {
    path: 'game',
    canActivate: [MainClientOnlyGuard],
    loadComponent: () =>
      import('./pages/main-screen/main-screen.component').then(
        (mod) => mod.MainScreenComponent
      ),
  },
  {
    path: 'player/register/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/user-register/user-register.component').then(
        (mod) => mod.UserRegisterComponent
      ),
  },
  {
    path: 'login',
    canActivate: [PlayerAlreadyInGameGuard],
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/login/login.component').then((mod) => mod.LoginComponent),
  },
  {
    path: 'player',
    pathMatch: 'full',
    canActivate: [RegisteredPlayerOnlyGuard],
    loadComponent: () =>
      import('./pages/player-screen/player-screen.component').then(
        (mod) => mod.PlayerScreenComponent
      ),
  },
];
