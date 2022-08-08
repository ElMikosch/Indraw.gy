import { Injectable } from '@angular/core';
import { IndrawgyApi } from '../../services/indrawgy.api';

@Injectable()
export class PlayerScreenFacade {
  constructor(private api: IndrawgyApi) {}

  changePlayerReadyState(ready: boolean): void {
    this.api.post('changePlayerReadyState', ready);
  }
}
