import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFacade } from './login.facade';
import { FormsModule } from '@angular/forms';
import { IndrawgyApi } from '../../services/indrawgy.api';
import { PlayerConnectionService } from '../../services/player-connection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule],
  providers: [LoginFacade],
  standalone: true,
})
export class LoginComponent implements OnInit {
  public username: string;

  constructor(private facade: LoginFacade, private router: Router) {
    this.username = '';
  }

  async ngOnInit(): Promise<void> {}

  async login() {
    await this.facade.login(this.username);
    await this.router.navigate(['player']);
  }
}
