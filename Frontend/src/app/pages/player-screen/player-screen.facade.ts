import { Injectable } from '@angular/core';
import { IndrawgyApi } from '../../services/indrawgy.api';

@Injectable()
export class PlayerScreenFacade {
  constructor(private api: IndrawgyApi) {}
}
