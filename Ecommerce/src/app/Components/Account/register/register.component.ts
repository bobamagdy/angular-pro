import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from 'src/app/models/register-model';
import { RegisterServiceService } from 'src/app/Services/registerService.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: RegisterServiceService) { }
  regex: RegExp;
  userForm: FormGroup;
  reg: RegisterModel;
  message: string;
  isBusy:boolean;
  messageValidate = {
    userName: {
      required: 'user name is required',
      repeat: ''
    },
    email: {
      required: 'email is required',
      notValid: 'email is incorect format',
      repeat: ''
    },
    password: {
      required: 'password is required',
      minlength: 'password must be 6 characters',
      notMatch: 'password should contain(upperCase letter,lowerCase letter,special character) '
    },
    passwordConfirm: {
      required: 'Confirm password is required',
      minlength: 'password must be 6 characters',
      isMatch: "must match with your password"
    }

  }


  ngOnInit(): void {
    this.message = '';
    this.reg = {
      userName: '', email: '', password: ''
    };
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.min(6)]],
      passwordConfirm: ['', [Validators.required, Validators.min(6)]]
    });
    this.isBusy=false;

    //this.getAllUsers();
    this.userForm.valueChanges.subscribe(
      x=>{
        if(this.userForm.status=='VALID'){
          console.log('form is valid');
          this.isBusy=true;
        }
    },
      err=>{
        console.log(err);
      }
    )
  }


  register() {
    if (this.userForm.valid) {
      this.validateRegisterModel();
      this.service.Register(this.reg).subscribe(success => {
        this.message = "register is successful but you must verify your email";
        this.userForm.reset();
        this.userForm.value.password = '';
      }, err => console.log(err));
    }
  }


  validateRegisterModel() {
    this.reg.userName = this.userForm.value.userName;
    this.reg.email = this.userForm.value.email;
    this.reg.password = this.userForm.value.password;
  }


  isPasswordMatch() {
    if (this.userForm.value.password !== " " && this.userForm.value.passwordConfirm !== " ") {
      if ((this.userForm.value.password !== this.userForm.value.passwordConfirm) &&
        (this.userForm.value.password.length > 5 && this.userForm.value.passwordConfirm.length > 5)) {
        return true;
      }
    }
    return false;
  }

  isPasswordValid() {
    const pass = this.userForm.value.password;
    if (this.userForm.value.password !== " " && this.userForm.value.passwordConfirm !== " ") {
      if (pass !== "" && pass.length > 5) {
        this.regex = new RegExp('[a-z]');
        if (!this.regex.test(pass)) {
          this.messageValidate.password.notMatch = "password should contain lowercase letter";
          return false;
        }
        this.regex = new RegExp('[A-Z]');
        if (!this.regex.test(pass)) {
          this.messageValidate.password.notMatch = "password should contain uppercase letter";
          return false;
        }
        this.regex = new RegExp('[~!@#$%^&*()+<>{}_]');
        if (!this.regex.test(pass)) {
          this.messageValidate.password.notMatch = "password should contain special character";
          return false;
        }
        this.regex = new RegExp('[0-9]');
        if (!this.regex.test(pass)) {
          this.messageValidate.password.notMatch = "password should contain at least 1 number";
          return false;
        }
      }
      return true;
    }
    return true;
  }



  isUserNameExist() {

    const userName = this.userForm.value.userName;
    if (userName != null && userName != '' && this.isBusy==false) {
      this.service.UserNameExist(userName)
        .subscribe(success => {
          console.log('user name is exist');
          this.messageValidate.userName.repeat = "user name is already used ";
        }, ex =>{this.messageValidate.userName.repeat = "";
        console.log(ex)} );
      return true;
    }
    return false;
  }


  isEmailExist() {

    const email = this.userForm.value.email;
    if (email != null && email != '' && this.isBusy==false) {
      this.service.EmailExist(email)
        .subscribe(success => {
          console.log('email is exist');
          this.messageValidate.email.repeat = "email is already used ";
        }, ex =>{this.messageValidate.email.repeat = "";
        console.log(ex)} );
      return true;
    }
    return false;
  }
}
