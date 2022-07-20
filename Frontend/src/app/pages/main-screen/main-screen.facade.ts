import { Injectable } from '@angular/core';
import { IndrawgyApi } from '../../services/indrawgy.api';

@Injectable()
export class MainScreenFacade {
  constructor(private api: IndrawgyApi) {}
}
