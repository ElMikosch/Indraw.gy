import { Injectable } from '@angular/core';
import { LoginRequestDto } from 'src/app/models/request-dtos/login-request-dto';
import { IndrawgyApi } from 'src/app/services/indrawgy.api';

@Injectable()
export class LoginFacade {
  constructor(private api: IndrawgyApi) {}

  public async playerAlreadyInGame() {
    return await this.api.get<boolean>('playerAlreadyInGame');
  }

  public async login(username: string) {
    return await this.api.post<LoginRequestDto, unknown>('login', { username });
  }
}
