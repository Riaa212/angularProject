import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-user',
  standalone: false,
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {

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
