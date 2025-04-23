import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginService } from "../login.service";
import { inject } from "@angular/core";

export class Interceptor implements HttpInterceptor
{

    loginService=inject(LoginService)

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.loginService.getLoginData('token');
        // let currentUserEmail = this.loginService.getLoginData('uname'); 
        // console.log("current user email==>"+currentUserEmail)
         // Method to get the JWT token
         console.log("in interceptor...");
         
        if (currentUser) {
          request = request.clone({
            setHeaders: {
              'Authorization': `Bearer ${currentUser}`,
              'Content-Type': 'application/json', // You can add other headers if necessary
            }
          });
        }
        return next.handle(request);
      }
}