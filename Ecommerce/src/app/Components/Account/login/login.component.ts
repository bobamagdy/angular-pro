import { AuthService } from './../../../Services/auth.service';
import { LoginModel } from './../../../models/login-model';
import { RegisterServiceService } from './../../../Services/registerService.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
     private service: RegisterServiceService,
     private route:Router,
     private auth:AuthService
     ) { }
  message: string;
  loginForm: FormGroup;
  logModel: LoginModel;
  messageValidate = {
    email: {
      required: 'email is required',
    },
    password: {
      required: 'password is required',
    },
  }

  ngOnInit(): void {
    this.message = '';
    this.logModel = {
      email: '', password: '', rememberMe: false
    };

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]],
      rememberMe: false
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.validateLoginModel();
      this.service.Login(this.logModel).subscribe(success => {
        const rem=!!this.loginForm.value.rememberMe;
        const email=this.loginForm.value.email;
        this.auth.installStorage(rem,email);
        this.route.navigate(['Home']).then(x=>{window.location.reload();});
      }, err => {
        console.log(err);
        this.message = err.error
      });
    }
  }


  validateLoginModel() {
    this.logModel.email = this.loginForm.value.email;
    this.logModel.password = this.loginForm.value.password;
    this.logModel.rememberMe = this.loginForm.value.rememberMe;
  }
}
