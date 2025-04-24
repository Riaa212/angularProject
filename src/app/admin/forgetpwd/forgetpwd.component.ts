import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgetpwd',
  standalone: false,
  templateUrl: './forgetpwd.component.html',
  styleUrl: './forgetpwd.component.css'
})
export class ForgetpwdComponent {

  adminService=inject(AdminService)

  inputData:any
  constructor(private http:HttpClient,private fb:FormBuilder)
  {
    this.sentOtp("admin@gmail.com");
    this.inputData=fb.group({
      email:["admin@gmail.com",Validators.required],
      otp:['',Validators.required],
      password:['',Validators.required]
    })
  }
  
  otpdata:any
  sentOtp(email:any)
  {
    this.adminService.sentOtp(email).subscribe((rs)=>this.otpdata=rs)
  }

  verifyOtp()
  {
    this.adminService.verifyOtp(this.inputData.value).subscribe()
    }


}
