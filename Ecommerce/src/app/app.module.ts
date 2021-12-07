import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component';
import { LoginComponent } from './Components/Account/login/login.component';
import { RegisterComponent } from './Components/Account/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterMenuComponent } from './Components/footer-menu/footer-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { RegisterConfirmComponent } from './Components/Account/register-confirm/register-confirm.component';
import { ForgetPasswordComponent } from './Components/Account/forget-password/forget-password.component';
import { PasswordConfirmComponent } from './Components/Account/password-confirm/password-confirm.component';
import { DashboardComponent } from './Components/Admin/dashboard/dashboard.component';
import { UsersComponent } from './Components/Admin/users/users.component';
import { AddUserComponent } from './Components/Admin/add-user/add-user.component';
import { UserRolesComponent } from './Components/Admin/user-roles/user-roles.component';
import { AccessDeniedComponent } from './Components/access-denied/access-denied.component';
import { DashboardGuardService } from './Services/dashboard-guard.service';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterMenuComponent,
    NotFoundComponent,
    RegisterConfirmComponent,
    ForgetPasswordComponent,
    PasswordConfirmComponent,
    DashboardComponent,
    UsersComponent,
    AddUserComponent,
    UserRolesComponent,
    AccessDeniedComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DashboardGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
