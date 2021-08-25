import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authService/authentication.service';
import { LoaderService } from '../services/loader/loader.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  authReq:any;
    constructor(private authenticationService: AuthenticationService,public loaderSer:LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // this.loaderSer.showNgxSpinner();

        if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {

          if (req.body instanceof FormData)
          {
            this.authReq = req.clone({
              headers: new HttpHeaders({
                  // 'Content-Type': 'multipart/form-data',
                  'Authorization': `Basic ${window.btoa(this.authenticationService.username + ":" + this.authenticationService.password)}`
              })
            });
          }else{
             this.authReq = req.clone({
              headers: new HttpHeaders({
                  'Content-Type': 'application/json ',
                  'Authorization': `Basic ${window.btoa(this.authenticationService.username + ":" + this.authenticationService.password)}`
              })
          });
         }
            return next.handle(this.authReq);
        } else {
            return next.handle(req);
        }
    }
}
