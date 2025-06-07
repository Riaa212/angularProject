import { Component, inject, OnInit } from '@angular/core';
// import { LoginStorage } from '../../login-storage';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit
{

  // loginstore=inject(LoginStorage)
  route=inject(Router)
  userService=inject(UserService)
  storage=inject(LoginService)
  userData: any = { content: [] };

  totalRecords: number = 0;
  pageSize: number = 10;

  records:number | undefined
  pageIndex: number = -1;
  previous:number=0
  next:number=0
  searchUserData:string=''
  s: any;
  getsearchUserData:any

  totalUser:any

  totalactiveUsers:number | undefined
  noData:any
  allUsers: any[] = []; 
  filteredUsers: any[] = [];
  showActiveOnly = false;
  

  page: number[] = [5, 10, 15]; // dropdown option
  totalPages: any;
  pagesArray: number[]=[];



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

  ngOnInit() {
    // this.allUsers= this.OnNext(); // Replace with real HTTP call
    this.filteredUsers = this.allUsers;
  }
  

  onCheckboxChange() {
    if (this.showActiveOnly) {
      this.filteredUsers = this.allUsers.filter(user => user.isActive);
    } else {
      this.filteredUsers = this.allUsers;
    }
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


  // deleteById(userid:number){
  //   this.userService.deleteUserById(userid).subscribe();
  //   // console.log(userid)
  //   alert('user deleted successfully')
  //   location.reload()
  // }

  deletePopup()
  {

//    const swalWithBootstrapButtons = Swal.mixin({
//   customClass: {
//     confirmButton: "btn btn-success",
//     cancelButton: "btn btn-danger"
//   },
//   buttonsStyling: false
// });
// swalWithBootstrapButtons.fire({
//   title: "Are you sure?",
//   text: "You won't be able to revert this!",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonText: "Yes, delete it!",
//   cancelButtonText: "No, cancel!",
//   reverseButtons: true
// }).then((result) => {
//   if (result.isConfirmed) {
//     swalWithBootstrapButtons.fire({
//       title: "Deleted!",
//       text: "Your file has been deleted.",
//       icon: "success"
//     });
//   } else if (
//     /* Read more about handling dismissals below */
//     result.dismiss === Swal.DismissReason.cancel
//   ) {
//     swalWithBootstrapButtons.fire({
//       title: "Cancelled",
//       text: "Your imaginary file is safe :)",
//       icon: "error"
//     });
//   }
// });

    Swal.fire({
  title: "Deleted successfully!",
  text: "You clicked the button!",
  icon: "success",
  confirmButtonColor: "#4CAF50",
   timer: 1500
}).then(() => {
    location.reload(); // Refresh page after popup closes
  });
}


  deleteById(userId: number) {
  this.userService.deleteUserById(userId).subscribe();
        this.deletePopup();
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
        this.allUsers = this.userData.content;
        this.totalPages =this.userData.pageble.totalPages;
        // this.totalPages=this.userData.pageable.totalPages;
        this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i);
        this.onCheckboxChange();
        // this.allUsers=this.userData.content
      })
    }
  }
  
  Onprevious()
  {
    this.pageIndex--
    this.previous=this.pageIndex
    // console.log(this.previous)
    this.userService.getAllUsers(this.previous,this.pageSize).subscribe(a=>
      {
        this.userData=a
        this.allUsers = this.userData.content;
        this.totalPages =this.userData.pageble.totalPages;
        // this.totalPages=this.userData.pageable.totalPages;
        this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i);
        this.onCheckboxChange();
        // this.allUsers=this.userData.content
      })
  }

  // loadUsers()
  // {
  //   this.userService.getAllUsers(this.previous,this.pageSize).subscribe(a=>
  //     {
  //       this.userData=a
  //       this.allUsers = this.userData.content;
  //       this.totalPages =this.userData.pageble.totalPages;
  //       // this.totalPages=this.userData.pageable.totalPages;
  //       this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i);
  //       this.onCheckboxChange();
  //       // this.allUsers=this.userData.content
  //     })
  // }

  // goToPage(page: number) {
  //   this.pageIndex = page;
  //   this.loadUsers();
  // }
  

  onChangePageSize(newSize: number) {
    this.pageSize = newSize;
    this.pageIndex = -1;
    this.OnNext(); // ya jo bhi method fetch karta hai new data

  }
  

  onPageSizeChange() {
    this.pageIndex = -1;
    // this.OnNext();
    // this.loadUsers();
  }
  
  searchUser()
  {
    this.userService.searchUser(this.searchUserData,this.previous,this.pageSize).subscribe(a=>
    {
      this.userData=a
      console.log(a)
    }
    )
  }

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

