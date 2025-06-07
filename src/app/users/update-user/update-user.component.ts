import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-update-user',
  standalone: false,
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})


export class UpdateUserComponent {

  userservice=inject(UserService)
  userdata:any
  inputData:any
  route=inject(Router)
  userId:any
  
  

  constructor(private activeroute:ActivatedRoute,private fb:FormBuilder)
  {
    this.userId=activeroute.snapshot.paramMap.get('id');
    this.getUserById();
   console.log("user id==="+this.userId)
    this.inputData=fb.group({
      userName:['',Validators.required],
      email:['',Validators.required],
      address:['',Validators.required],
      // mobileNumber:['',Validators.required],
      // pinCode:['',Validators.required]
    });
  }

  getUserById()
  {
    this.userservice.getUserById(this.userId).subscribe((rs)=>this.userdata=rs)
  }

  updateUserPopUp()
  {
      Swal.fire({
      title: "User Updated successfully!",
      text: "You clicked the button!",
      icon: "success",
      confirmButtonColor: "#4CAF50",
       timer: 1500
    })
  }

  updateUserById()
  {
    console.log(this.inputData.value)
    this.userservice.updateUserById(this.userId,this.inputData.value).subscribe()
       Swal.fire({
      title: "User Updated successfully!",
      text: "You clicked the button!",
      icon: "success",
      confirmButtonColor: "#4CAF50",
       timer: 1500
    })
    
    const modalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(modalEl);
    // modal.show();
    // alert('user updated succefully')

    // this.route.navigate(['/dashboard'])
  }

  getInitials(fullName: string): string {
    if (!fullName) return '';
    const words = fullName.trim().split(' ');
    let initials = words[0]?.charAt(0).toUpperCase();
    if (words.length > 1) {
    initials += words[1]?.charAt(0).toUpperCase();
    }
    return initials;
    }

}

