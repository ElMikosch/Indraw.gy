import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFacade } from './login.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginFacade],
})
export class LoginComponent implements OnInit {
  public username: string;

  constructor(private facade: LoginFacade, private router: Router) {
    this.username = '';
  }

  async ngOnInit(): Promise<void> {
    const alreadyInGame = await this.facade.playerAlreadyInGame();
    if (alreadyInGame) await this.router.navigate(['game']);
  }

  async login() {
    await this.facade.login(this.username);
  }
}
