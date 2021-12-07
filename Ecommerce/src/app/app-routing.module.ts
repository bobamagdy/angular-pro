import { AccessDeniedComponent } from './Components/access-denied/access-denied.component';
import { AddUserComponent } from './Components/Admin/add-user/add-user.component';
import { DashboardComponent } from './Components/Admin/dashboard/dashboard.component';
import { PasswordConfirmComponent } from './Components/Account/password-confirm/password-confirm.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './Components/Account/forget-password/forget-password.component';
import { LoginComponent } from './Components/Account/login/login.component';
import { RegisterConfirmComponent } from './Components/Account/register-confirm/register-confirm.component';
import { RegisterComponent } from './Components/Account/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { DashboardGuardService } from './Services/dashboard-guard.service';

const routes: Routes = [
  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'Home',component:HomeComponent},
  {path:'Register',component:RegisterComponent},
  {path:'Login',component:LoginComponent},
  {path:'RegisterConfirm',component:RegisterConfirmComponent},
  {path:'ForgetPassword',component:ForgetPasswordComponent},
  {path:'ConfirmPassword',component:PasswordConfirmComponent},
  {path:'ControlPanel',component:DashboardComponent, canActivate:[DashboardGuardService]},
  {path:'EditUser/:id',component:AddUserComponent},
  {path:'AccessDenied',component:AccessDeniedComponent},
  {path:'NotFound',component:NotFoundComponent},
  {path:'',redirectTo:'/Home',pathMatch:'full'},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
