import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpwd',
  standalone: false,
  templateUrl: './forgetpwd.component.html',
  styleUrl: './forgetpwd.component.css'
})
export class ForgetpwdComponent {

  adminService=inject(AdminService)
  loginstore=inject(LoginService)
  adminEmail:any
  route=inject(Router)
  inputData:any
  constructor(private http:HttpClient,private fb:FormBuilder)
  {
    this.adminEmail=this.loginstore.getLoginData("userName");
    console.log(this.adminEmail)
    // this.sentOtp("sahil@gmail.com");
    this.inputData=fb.group({
      otp:['',Validators.required],
      password:['',Validators.required]
    })
    this.adminEmail=fb.group({
      email:['',Validators.required],
    })
  }


  
  otpdata:any

  sentOtp()
  {
    this.adminService.sentOtp(this.adminEmail.value.email).subscribe((rs)=>this.otpdata=rs)
  }

  verifyOtp()
  {
    const payload={
        email:this.adminEmail.value.email,
        otp:this.inputData.value.otp,
        password:this.inputData.value.password
    }
    // console.log(this.inputData.value)
    this.adminService.verifyOtp(payload).subscribe((rs)=>console.log(rs))
    alert('password updated successfully')
    this.route.navigate([''])
    }


}
