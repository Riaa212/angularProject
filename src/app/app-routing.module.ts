import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { ForgetpwdComponent } from './admin/forgetpwd/forgetpwd.component';

const routes: Routes = [
  {path:'dashboard',component:AdminDashboardComponent},
  { path:'adminProfile',component:AdminProfileComponent},
  {path:'',component:AdminLoginComponent},
  {path:'updateUser/:id',component:UpdateUserComponent},
  {path:'forgetPwd',component:ForgetpwdComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
