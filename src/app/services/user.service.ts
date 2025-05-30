import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  baseurl="/user"
  getAllUsers(pageNumber:number,pagesize:number)
  {
    const params = new HttpParams()

    .set('page', pageNumber.toString())
    .set('size', pagesize.toString())
    return this.http.get(this.baseurl+"/getAllUsers",{params})  
  }

  searchUser(name:any,pageNumber:number,pagesize:number)
  {
    const params = new HttpParams()

    .set('page', pageNumber.toString())
    .set('size', pagesize.toString())
    return this.http.get(this.baseurl+"/getUserByName/"+name,{params}) 
  }
  downloadUserReport():Observable<Blob>
  {
    // { responseType: 'blob' }
    // { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
  const blob = new Blob([], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  return this.http.get<Blob>(this.baseurl+"/downloadExcelFile")
  }

  downloadPdf()
  {
    // http://localhost:2424/user/downloadpdf
    return this.http.get(this.baseurl+'/downloadpdf', {
      responseType: 'blob' // Important: receive binary file
    });
  }

  getUserById(userId:any)
  {
    return this.http.get(this.baseurl+"/getUserById/"+userId)
  }

  deleteUserById(userid:any)
  {
    return this.http.delete(this.baseurl+"/deleteUserById/"+userid)
  }

  updateUserById(userId:any,user:any)
  {
    return this.http.put(this.baseurl+"/updateUserById/"+userId,user)
  }

}
