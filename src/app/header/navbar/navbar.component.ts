import { Component, inject } from '@angular/core';
import { LoginService } from '../../login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  loginstore=inject(LoginService)
  route=inject(Router)
  tocken:any

  constructor()
  {
    this.loginstore.getLoginData('token');
    // this.tocken=this.loginstore.getLoginData('token');
    console.log(this.tocken)
  }
  logout(){

    this.tocken=this.loginstore.getLoginData('token');

    if(this.tocken)
    {
      this.loginstore.removeData('token');
      this.loginstore.removeData('userName');
      console.log("logout successfully")
      this.route.navigate(['/login'])
    }
  }

  
  // isLoggedIn(): boolean {
  //       return !!this.getToken();  // returns true if token exists
  // }
  
}
