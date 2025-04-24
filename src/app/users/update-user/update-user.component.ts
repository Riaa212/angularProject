import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  updateUserById()
  {
    
    console.log(this.inputData.value)
    this.userservice.updateUserById(this.userId,this.inputData.value).subscribe()
    alert('user updated succefully')
    this.route.navigate(['/dashboard'])
  }

}
