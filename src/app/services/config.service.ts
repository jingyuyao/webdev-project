import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  constructor() { }

  getApiHost(): string {
    return environment.apiHost;
  }
}
