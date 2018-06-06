import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  constructor() { }

  getApiUrl(path: string): string {
    return environment.apiHost + path;
  }
}
