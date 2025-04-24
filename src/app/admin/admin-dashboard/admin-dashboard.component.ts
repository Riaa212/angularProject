import { Component, inject } from '@angular/core';
// import { LoginStorage } from '../../login-storage';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  // loginstore=inject(LoginStorage)
  route=inject(Router)
  userService=inject(UserService)
  storage=inject(LoginService)
  userData:any

  totalRecords: number = 0;
  pageSize: number = 10;
  pageIndex: number = -1;
  previous:number=0
  next:number=0
  searchUserData:string=''
s: any;
  constructor(private loginstore:LoginService,private fb:FormBuilder)
  {
    // this.getAllUsers()
    // console.log(this.userData)
    this.OnNext()
    // this.searchUserData=fb.group({
    //   search:['',Validators.required]
    // })
  }
  logout(){

    const tocken=this.loginstore.getLoginData('token');
    if(tocken)
    {
      this.loginstore.removeData('token');
      this.loginstore.removeData('userName');
      console.log("logout successfully")
      this.route.navigate(['/login'])
    }
  }

  // getAllUsers()
  // {
    
  //   this.userService.getAllUsers().subscribe((rs)=>this.userData=rs)
  // }

  deleteById(userid:number){
    this.userService.deleteUserById(userid).subscribe();
    // console.log(userid)
    alert('user deleted successfully')
    location.reload()
  }

  Onprevious()
  {
    this.pageIndex--
    this.previous=this.pageIndex
    // console.log(this.previous)
    this.userService.getAllUsers(this.previous,this.pageSize).subscribe(a=>this.userData=a)
  }
  OnNext()
  {
    if(this.storage.getLoginData('token'))
    {
    this.pageIndex++
    this.next=this.pageIndex
    console.log(this.userService.getAllUsers(this.next,this.pageSize).subscribe(a=>this.userData=a))
    }
    // else{
    //   this.route.navigate(['/login'])
    // }
  }

  searchUser()
  {
    this.userService.searchUser(this.searchUserData,this.previous,this.pageSize).subscribe(a=>this.userData=a)
  }

  updateAdminData()
  {
      
  }

  getInitials(fullName: string): string {
    if (!fullName) return '';
    const words = fullName.trim().split(' ');
    let initials = words[0]?.charAt(0).toUpperCase();
    if (words.length > 1) {
    initials += words[1]?.charAt(0).toUpperCase();
    }
    return initials;
    }
}
