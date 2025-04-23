import { Component, inject } from '@angular/core';
import { LoginService } from '../../login.service';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
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

  email:any
  admindata:any
  adminid:any

  inputData:any

  constructor(private route: ActivatedRoute,private fb:FormBuilder)
  {
   this.email=this.loginstore.getLoginData("userName")
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
    this.adminservice.getAdminByEmail(this.email).subscribe((rs)=>this.admindata=rs)
  }

  updateAdminById()
  {
    this.adminservice.updateAdminById(this.admindata.id,this.inputData.value).subscribe()
    alert('profile updated successfully')
  }
}
