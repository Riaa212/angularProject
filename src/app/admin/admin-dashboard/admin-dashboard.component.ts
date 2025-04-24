import { Component, inject } from '@angular/core';
// import { LoginStorage } from '../../login-storage';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';
import { UserService } from '../../services/user.service';

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
  
  userData:any

  totalRecords: number = 0;
  pageSize: number = 10;
  pageIndex: number = -1;
  previous:number=0
  next:number=0
  constructor(private loginstore:LoginService)
  {
    // this.getAllUsers()
    // console.log(this.userData)
    this.OnNext()
  }
  logout(){

    const tocken=this.loginstore.getLoginData('token');
    if(tocken)
    {
      this.loginstore.removeData('token');
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
    console.log(this.previous)
    console.log(this.userService.getAllUsers(this.previous,this.pageSize).subscribe(a=>this.userData=a))
  }
  OnNext()
  {
    this.pageIndex++
    this.next=this.pageIndex
    console.log(this.userService.getAllUsers(this.next,this.pageSize).subscribe(a=>this.userData=a))
  }

  updateAdminData()
  {
      
  }
}
