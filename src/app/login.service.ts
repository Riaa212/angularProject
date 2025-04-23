import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  setLoginData(key:string,value:string):void
  {
    sessionStorage.setItem(key,value)
  }

  getLoginData(key:string):string|null
  {
    return sessionStorage.getItem(key)
  }

  removeData(key:string):void
  {
    sessionStorage.removeItem(key)
  }

  clearData():void
  {
    sessionStorage.clear();
  }
}
