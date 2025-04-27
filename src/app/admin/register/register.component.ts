import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username: any = '';
  password:any='';
  // imageUrl: any = '';

  uploadForm:any;  // FormGroup for reactive form
  imageUrl: any; 
  route=inject(Router)
  constructor(private http:HttpClient,private adminservice:AdminService,private fb:FormBuilder)
  {
    this.uploadForm = this.fb.group({
      username: ['', Validators.required],  // Username required
      password: ['', Validators.required],       // Date of Birth required
      email: ['', Validators.required],  // Role with default value 'USER'
      image: [null, Validators.required]     // Image file input (required)
    });
  }


   // Method to handle file selection
   onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Set the file in the form control
      this.uploadForm.patchValue({
        image: file
      });
    }
  }
  
  // Method to submit the form
  onSubmit(): void {
    if (this.uploadForm.valid) {
      const formData = new FormData();
      formData.append('image', this.uploadForm.get('image')?.value, this.uploadForm.get('image')?.value.name);
      formData.append('username', this.uploadForm.get('username')?.value);
      formData.append('email', this.uploadForm.get('email')?.value);
      formData.append('password', this.uploadForm.get('password')?.value);
      // formData.append('role', this.uploadForm.get('role')?.value);

      // Call the upload service to send the data to the backend
      this.adminservice.saveDataWithImage(formData).subscribe(response => {
        console.log('File uploaded successfully:', response);
        this.imageUrl = response;  // Display uploaded image URL
        alert("register successfully...")
        this.route.navigate([''])
        
      }, error => {
        console.error('Error uploading file:', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
