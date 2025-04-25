import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  baseurl="/admin"
  constructor(private http:HttpClient) {

   }

   getCaptcha()
   {
    return this.http.get(this.baseurl+"/getCaptcha");
   }
}
