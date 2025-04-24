import { Component, inject } from '@angular/core';
import { LoginService } from '../../login.service';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  standalone: false,
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {

  loginstore=inject(LoginService)
  adminservice=inject(AdminService)

  adminemail:any
  admindata:any
  adminid:any

  inputData:any
  rout=inject(Router)
  constructor(private route: ActivatedRoute,private fb:FormBuilder)
  {
   this.adminemail=this.loginstore.getLoginData("userName")
   this.getAdminByEmail()
   this.adminid = this.route.snapshot.paramMap.get('id');
    console.log(this.adminid)
   this.inputData=fb.group({
    userName:['',Validators.required],
    email:['',Validators.required],
  })
  }

  getAdminByEmail()
  {
    this.adminservice.getAdminByEmail(this.adminemail).subscribe((rs)=>this.admindata=rs)
  }

  updateAdminById()
  {
    this.adminservice.updateAdminById(this.admindata.id,this.inputData.value).subscribe()
    alert("profile updated succefully")
    this.rout.navigate(['/dashboard'])
  }
}
