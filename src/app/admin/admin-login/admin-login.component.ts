import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

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
 route=inject(Router)
  constructor(fb:FormBuilder)
  {
    this.loginForm=fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  submitData()
  {
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
