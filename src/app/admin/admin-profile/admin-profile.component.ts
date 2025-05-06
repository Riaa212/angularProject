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
  // uploadForm: any;
  imageUrl: any;
  constructor(private route: ActivatedRoute,private fb:FormBuilder)
  {
   this.adminemail=this.loginstore.getLoginData("userName")
   
   this.getAdminByEmail()
   this.adminid = this.route.snapshot.paramMap.get('id');
    console.log("adid"+this.adminid+"\n admindata"+this.admindata)
   this.inputData=fb.group({
    // aid:[1],
    email:['', Validators.required],  // Role with default value 'USER'
    userName:['', Validators.required]  // Username required
  })
  }

  getAdminByEmail()
  {
    this.adminservice.getAdminByEmail(this.adminemail).subscribe((rs)=>this.admindata=rs)
  }
  // onFileSelected(event: any): void {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     // Set the file in the form control
  //     this.inputData.patchValue({
  //       image: file,
  //     });
  //     console.log("file......"+file.name)
  //   }
  // }

  updateAdminById()
  {
    console.log("input data"+this.inputData.value)
    this.adminservice.updateProfile(this.inputData.value).subscribe(response => {
      // console.log('File uploaded successfully:', response);
      // this.imageUrl = response;  // Display uploaded image URL
      alert("updated  successfully...")
      this.rout.navigate(['/adminProfile'])
      
    }, error => {
      console.error('Error uploading file:', error);
    });
    // if (this.inputData.valid) {
      // const formData = new FormData();

      // console.log(this.inputData.get('image')?.value.name)
      // formData.append('email', this.inputData.get('email')?.value);
      // formData.append('username', this.inputData.get('username')?.value);
      // formData.append('image', this.inputData.get('image')?.value, this.inputData.get('image')?.value.name);
  
      // console.log("form data=="+formData)
      // this.adminservice.updateProfile(this.inputData.value).subscribe(response => {
      //   // console.log('File uploaded successfully:', response);
      //   // this.imageUrl = response;  // Display uploaded image URL
      //   alert("updated  successfully...")
      //   this.rout.navigate(['/adminProfile'])
        
      // }, error => {
      //   console.error('Error uploading file:', error);
      // });
    // } 
  }
}
