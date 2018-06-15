import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '../services/config.service';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private static readonly FULL_URL = /^((http|https|ftp):\/\/)/;

  constructor(private configService: ConfigService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (BaseUrlInterceptor.FULL_URL.test(req.url)) {
      return next.handle(req);
    }

    const fullUrl = this.configService.getApiHost() + req.url;
    const fullUrlReq = req.clone({url: fullUrl});
    return next.handle(fullUrlReq);
  }
}
