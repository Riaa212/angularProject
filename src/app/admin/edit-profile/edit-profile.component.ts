import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: false,
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit
{

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
    userName:['', Validators.required],  // Username required
    // image: [null, Validators.required] 
  })
  }
  ngOnInit() {
    // this.inputData = this.fb.group({
    //   image: [null],
    // });
  }

  getAdminByEmail()
  {
    this.adminservice.getAdminByEmail(this.adminemail).subscribe((rs)=>this.admindata=rs)
  }

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
  
  onFileSelected(event: any): void {
    const file:File = event.target.files[0];
    // console.log("file type==="+file.type)
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
  

      this.adminservice.updateAdminPhoto(formData).subscribe({
        next: (res) => {
          console.log('Upload successful', res);
          alert('Profile photo updated successfully!');
        },
        error: (err) => {
          console.error('Upload failed:', err);
          alert('Failed to upload profile photo.');
        }
      });
    }
  }
  
  
  // Method to handle file selection
  // onFileSelected(event: any): void {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     // Set the file in the form control
  //     this.inputData.patchValue({
  //       image: file
  //     });
  //     const formData = new FormData();
  //     formData.append('image', this.inputData.get('image')?.value, this.inputData.get('image')?.value.name);
  //     this.adminservice.updateAdminPhoto(formData).subscribe({
  //           next: (res) => {
  //             console.log('Upload successful', res);
  //             alert('Profile photo updated successfully!');
  //           },
  //           error: (err) => {
  //             console.error('Upload failed:', err);
  //             alert('Failed to upload profile photo.');
  //           }
  //         });

  //   }
  // }

  // ====================================================================================
  // selectedFile: File | null = null;

  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedFile = file;
  //     this.uploadProfilePhoto();  // 👈 auto upload
  //   }
  // }
  
  // uploadProfilePhoto(): void {
  //   const formData = new FormData();
    
  //   formData.append('image', this.selectedFile!, this.selectedFile!.name);

  //   // this.selectedFile?.type.startsWith('multipart/form-data')
  //   console.log("type======"+this.selectedFile?.type)
  //   this.adminservice.updateAdminPhoto(formData).subscribe({
  //     next: (res) => {
  //       console.log('Upload successful', res);
  //       alert('Profile photo updated successfully!');
  //     },
  //     error: (err) => {
  //       console.error('Upload failed:', err);
  //       alert('Failed to upload profile photo.');
  //     }
  //   });
  // }
  


}
