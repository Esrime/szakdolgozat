import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { BaseService } from './base.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private bs: BaseService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.bs.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user){
          return next.handle(req);
        }
        const modifiedReq= req.clone({params: new HttpParams().set('auth', user.token)})
        return next.handle(modifiedReq);
      }));
    }
}
