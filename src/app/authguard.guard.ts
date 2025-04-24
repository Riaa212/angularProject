import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const authguardGuard: CanActivateFn = (route, state) => {

  let storage=inject(LoginService)
const r=inject(Router)

let log=storage.getLoginData('token')

console.log("=====>"+log)

if(log==null)
{
  r.navigate([''])  
  return false;
}
  return true;
};
