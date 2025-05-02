import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
// import {
//   trigger, style, animate, transition
// } from '@angular/animations';
@Component({
  selector: 'app-forgetpwd',
  standalone: false,
  templateUrl: './forgetpwd.component.html',
  styleUrl: './forgetpwd.component.css'
  
  // animations: [
  //   trigger('fadeIn', [
  //     transition(':enter', [
  //       style({ opacity: 0, transform: 'translateY(20px)' }),
  //       animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  //     ])
  //   ])
  // ]
})
export class ForgetpwdComponent {

  forgetForm: FormGroup;
  resetForm: FormGroup;
  showOtpSection = false;
  otpControls: FormControl[] = [];
  route=inject(Router)
  constructor(private fb: FormBuilder,private http:HttpClient) {

    this.forgetForm = this.fb.group({
      recipient: ['', [Validators.required, Validators.email]]
    });

    this.otpControls = Array.from({ length: 6 }, () => new FormControl('', [Validators.required]));

    this.resetForm = this.fb.group({
      otp: this.fb.group(
        this.otpControls.map((ctrl, i) => ({ [`otp${i}`]: ctrl }))
          .reduce((acc, cur) => ({ ...acc, ...cur }), {})
      ),
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmitEmail() {

    if (this.forgetForm.valid) {
      // call your backend for sending OTP
      this.http.post("http://localhost:2424/admin/testOtp",this.forgetForm.value).subscribe(
        (rs)=>
        {
          if(rs==null)
          {
            this.showOtpSection = false;
            alert("email does not exists...")            
          }
          else 
          {
            this.showOtpSection = true;
            alert("please check your email")
          }
        }
        ) 
    }
  }

  onSubmitReset() {
    if (this.resetForm.valid) {
      const otpValue = this.otpControls.map(c => c.value).join('');
      console.log('OTP:', otpValue);
      console.log('New Password:', this.resetForm.value.newPassword);
      const payload={
        email:this.forgetForm.value.recipient,
        otp:otpValue,
        password:this.resetForm.value.newPassword

      }
      this.http.post("http://localhost:2424/admin/resetpassword",payload).subscribe()
      alert('password updated successfully')
      this.route.navigate([''])
      // call your backend to reset password
    }
  }

  onOtpInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;
  
    if (value.length === 1 && index < 5) {
      const nextInput = input.parentElement.children[index + 1];
      if (nextInput) nextInput.focus();
    } else if (value.length === 0 && index > 0 && event.inputType === 'deleteContentBackward') {
      const prevInput = input.parentElement.children[index - 1];
      if (prevInput) prevInput.focus();
    }
  }

  // onOtpInput(event: any, index: number) {
  //   const input = event.target;
  //   const value = input.value;
  
  //   if (value.length === 1 && index < 5) {
  //     const nextInput = input.parentElement.children[index + 1];
  //     if (nextInput) nextInput.focus();
  //   } else if (value.length === 0 && index > 0 && event.inputType === 'deleteContentBackward') {
  //     const prevInput = input.parentElement.children[index - 1];
  //     if (prevInput) prevInput.focus();
  //   }

  // adminService=inject(AdminService)
  // loginstore=inject(LoginService)
  // adminEmail:any
  // route=inject(Router)
  // inputData:any
  // constructor(private http:HttpClient,private fb:FormBuilder)
  // {
  //   this.adminEmail=this.loginstore.getLoginData("userName");
  //   console.log(this.adminEmail)
  //   this.inputData=fb.group({
  //     otp:['',Validators.required],
  //     password:['',Validators.required]
  //   })
  //   this.adminEmail=fb.group({
  //     email:['',Validators.required],
  //   })
  // }


  
  // otpdata:any

  // sentOtp()
  // {
  //   this.adminService.sentOtp(this.adminEmail.value.email).subscribe((rs)=>this.otpdata=rs)
  // }

  // verifyOtp()
  // {
  //   const payload={
  //       email:this.adminEmail.value.email,
  //       otp:this.inputData.value.otp,
  //       password:this.inputData.value.password
  //   }
  //   // console.log(this.inputData.value)
  //   this.adminService.verifyOtp(payload).subscribe((rs)=>console.log(rs))
  //   alert('password updated successfully')
  //   this.route.navigate([''])
  //   }


}
