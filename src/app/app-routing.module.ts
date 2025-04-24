import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { ForgetpwdComponent } from './admin/forgetpwd/forgetpwd.component';
import { authguardGuard } from './authguard.guard';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { ViewUserComponent } from './users/view-user/view-user.component';

const routes: Routes = [
  {path:'dashboard',component:AdminDashboardComponent,canActivate:[authguardGuard]},
  {path:'adminProfile',component:AdminProfileComponent,canActivate:[authguardGuard]},
  {path:'',component:AdminLoginComponent},
  {path:'updateUser/:id',component:UpdateUserComponent,canActivate:[authguardGuard]},
  {path:'forgetPwd',component:ForgetpwdComponent},
  {path:'viewUser/:id',component:ViewUserComponent,canActivate:[authguardGuard]},
  {path:'**',component:ErrorpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
