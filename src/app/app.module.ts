import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewUserComponent } from './users/view-user/view-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Interceptor } from './interceptor/interceptor';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ForgetpwdComponent } from './admin/forgetpwd/forgetpwd.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { FilterPipe } from './filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './admin/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    ViewUserComponent,
    UpdateUserComponent,
    AdminProfileComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    ForgetpwdComponent,
    ErrorpageComponent,
    FilterPipe,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCaptchaModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
