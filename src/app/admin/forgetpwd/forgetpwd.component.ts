import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-forgetpwd',
  standalone: false,
  templateUrl: './forgetpwd.component.html',
  styleUrl: './forgetpwd.component.css'
})
export class ForgetpwdComponent {

  adminService=inject(AdminService)

  constructor(private http:HttpClient)
  {
    // this.sentOtp();
  }

  sentOtp(email:any)
  {
    this.adminService.sentOtp(email).subscribe((rs)=>console.log(rs))
  }

  verifyOtp()
  {

  }


}
