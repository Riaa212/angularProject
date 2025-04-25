import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseurl="/admin"
  constructor(public http:HttpClient) { 

  }

  login(loginData:any):Observable<any>
 {
  console.log("login called...")
  return this.http.post<any>(this.baseurl+"/login",loginData)
  .pipe(tap((response: any) => console.log('API Response:', response)))
 }

 getAdminByEmail(email:any):Observable<any>
 {
  console.log("email")
  return this.http.get<any>(this.baseurl+"/getAdminByEmail/"+email)
 }

 updateAdminById(id:any,admin:any)
 {  
  return this.http.put(this.baseurl+"/updateAdmin/"+id,admin)
 }
 sentOtp(email:any)
 {
  return this.http.get(this.baseurl+"/testOtp/"+email)
 }

 verifyOtp(resetpassword:any)
 {
  return this.http.post(this.baseurl+"/resetpassword",resetpassword)
 }
}
// baseurl="http://localhost:8087/user"

// constructor(public http:HttpClient) {

//  }

//  login(loginData:any):Observable<any>
//  {
//   return this.http.post<any>(this.baseurl+"/loginReq",loginData)
//   .pipe(tap((response: any) => console.log('API Response:', response)))
//  }