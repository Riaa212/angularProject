import { Component, inject } from '@angular/core';
// import { LoginStorage } from '../../login-storage';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  userData: any = { content: [] };

  totalRecords: number = 0;
  pageSize: number = 10;

  page:number[]=[5,10,15]
  records:number | undefined
  pageIndex: number = -1;
  previous:number=0
  next:number=0
  searchUserData:string=''
  s: any;
  getsearchUserData:any

  totalUser:any

  noData:any
  
  constructor(private loginstore:LoginService,private fb:FormBuilder,private http:HttpClient)
  {
    // this.getAllUsers()
    // console.log(this.userData)
    this.OnNext()
    // this.searchUserData=fb.group({
    //   search:['',Validators.required]
    // })
    this.searchUser()
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

    this.userService.getAllUsers(this.next,this.pageSize).subscribe(a=>
      {
        this.userData=a
        // this.totalUser=this.userData.numberOfElements
      })
    }
  }

  searchUser()
  {
    this.userService.searchUser(this.searchUserData,this.previous,this.pageSize).subscribe(a=>
    {
      // this.getsearchUserData=a
      // this.totalUser=this.getsearchUserData.totalElements
      // console.log(this.getsearchUserData.numberOfElements)
      this.userData=a
      console.log(a)
    }
    )
  }
  // basedOnRecord(val:any)
  // {
  //   this.records=val
  //   console.log("\n"+this.records)
  // }
  //reset after search
  reset(){
    location.reload()
  }

  //download user reports
 downlodUserReports()
 {
  this.http.get("http://localhost:2424/user/downloadExcelFile",{ responseType: 'blob' }).subscribe((response:Blob)=>{
    // Extract the filename from the 'Content-Disposition' header (if possible)
    const filename = 'userdata.xlsx';  // You can use a dynamic approach or extract from the header

    // Create a Blob from the response data
    const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Trigger the file download using FileSaver.js or manual method
    // saveAs(blob, filename);  // Using FileSaver.js
    // Or if you don't want FileSaver.js, use this instead:
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  })  
}

downloadPdf(){
  // this.http.get("http://localhost:2424/user/downloadpdf",{ responseType: 'blob' }).subscribe((response:Blob)=>{
  // })
  this.userService.downloadPdf().subscribe(blob => {
    const file = new Blob([blob], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(file);
    link.download = 'users.pdf';
    link.click();
  });
}

  updateAdminData()
  {
      
  }

  //for live search 
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

