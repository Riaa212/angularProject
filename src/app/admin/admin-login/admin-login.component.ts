import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { CaptchaService } from '../../services/captcha.service';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  loginForm:any
  loginData:any
  adminService=inject(AdminService)
  captchaservice=inject(CaptchaService)
  route=inject(Router)
  captchaImg:any
  // captchaVerified = false;
  constructor(fb:FormBuilder)
  {
    this.getCaptcha()
    this.loginForm=fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
      captcha:['',Validators.required]
      
    })
  }

  getCaptcha()
  {
    console.log("get captcha...")
    this.captchaservice.getCaptcha().subscribe((rs)=>
    this.captchaImg=rs
    )
  }


  refershCaptcha()
  {
    this.getCaptcha()
  }

  submitData()
  {
    // if(!this.captchaVerified)
    //   {
    //     console.log("please complete captcha")
    //     // alert('please complete captcha')
    //     // return;
    //   }
     
      const payload={
        email:this.loginForm.value.email,
        password:this.loginForm.value.password,
        captcha:this.loginForm.value.captcha
        // captcha:this.captchaToken
      }

    this.adminService.login(this.loginForm.value).subscribe((rs)=>
      {
        if (rs && rs.tocken) {
          // console.log("pay load..........."+payload)
          sessionStorage.setItem('token', rs.tocken) 
          console.log(rs.userName)
           console.log('token:', rs.tocken);
           sessionStorage.setItem('token', rs.tocken); 
           sessionStorage.setItem('userName',rs.userName);
           this.route.navigate(['/dashboard'])
          //  sessionStorage.setItem('uname',this.encryptData(rs.userName)) 
           // Store the token in localStorage
          //  this.r.navigate(['/profile']); 
         } else {
           console.error('Token not found in the response');
           alert('bad credenctials')
         }
      }
    )
  }
}

// siteKey = '6LdOASIrAAAAAEqg1SDgiDfzWq-QlHCBT_dyYj4-'; // ✅ Replace with your actual site key
  
// // secretKey='6LdOASIrAAAAAIu9Zr6ERoSR-iK58_27UjMkQlei';

// captchaToken: string = '';


// onCaptchaResolved(token: string) {
//   this.captchaToken = token;
//   console.log('CAPTCHA Token: ', token);
// }
// handleSuccess(token: string) {
//   this.captchaVerified = true;
//   console.log('CAPTCHA success! Token:', token);
// }

// handleReset() {
//   console.log('CAPTCHA reset!');
// }

// handleExpire() {
//   console.log('CAPTCHA expired!');
// }

// handleLoad() {
//   console.log('CAPTCHA loaded!');
// }