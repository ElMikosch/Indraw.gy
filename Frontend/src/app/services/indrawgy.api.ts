import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import Endpoints from '../../assets/endpoints.json';

@Injectable()
export class IndrawgyApi {
  sessionId: string;

  constructor(private httpClient: HttpClient) {
    this.sessionId = sessionStorage.getItem('sessionId') || '';
  }

  public async get<T>(endpointKey: keyof typeof Endpoints) {
    const url = Endpoints[endpointKey];
    return await this.getInternal<T>(url);
  }

  public async post<In, Out>(endpointKey: keyof typeof Endpoints, body: In) {
    const url = Endpoints[endpointKey];
    return await this.postInternal<In, Out>(url, body);
  }

  private getInternal<T>(url: string): Promise<T> {
    return lastValueFrom(this.httpClient.get<T>(url, this.getSessionHeader()));
  }

  private postInternal<In, Out>(url: string, body: In): Promise<Out> {
    return lastValueFrom(
      this.httpClient.post<Out>(url, body, this.getSessionHeader())
    );
  }

  private getSessionHeader() {
    return { headers: { SessionId: this.sessionId } };
  }
}
