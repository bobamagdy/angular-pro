import { Component, OnInit } from '@angular/core';
import { ResetNewPasswordModel } from 'src/app/models/resetNewPassword';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterServiceService } from 'src/app/Services/registerService.service';
import { CryptoService } from 'src/app/Services/crypto.service';

@Component({
  selector: 'app-password-confirm',
  templateUrl: './password-confirm.component.html',
  styleUrls: ['./password-confirm.component.css']
})
export class PasswordConfirmComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
     private service: RegisterServiceService,
     private router:Router,
     private activeRoute:ActivatedRoute,
     private decService:CryptoService
     ) { }
  regex: RegExp;
  userForm: FormGroup;
  passModel:ResetNewPasswordModel;

  messageValidate = {
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

    this.passModel={
      id:'',
      token:'',
      password:''
    }
    this.activeRoute.queryParams.subscribe(param => {
      //debugger
      var exist=false;
       this.passModel.id = param['ID'];
       this.passModel.token = param['Token'];
      if (this.passModel.id && this.passModel.token) {
       // var storage=localStorage.getItem('token');
        var keys=Object.keys(localStorage);
        keys.forEach(element=>{
          if(element!==null&&element.includes('token')){
            var item=localStorage.getItem(element);
            if(item!==null){
              var token=this.decService.Decrypt(item);
              if(token===this.passModel.token){
                exist=true;
                return;
              }
            }
          }
        });
        if(!exist){
        this.router.navigate(['Home']).then(x=>{window.location.reload();});
        }
      }else{
        this.router.navigate(['Home']).then(x=>{window.location.reload();});
      }
    }, ex => console.log(ex));

    this.userForm = this.fb.group({
      password: ['', [Validators.required, Validators.min(6)]],
      passwordConfirm: ['', [Validators.required, Validators.min(6)]]
    });
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

  ResetPassword(){

    if(this.userForm.value.password!==null){
      this.passModel.password=this.userForm.value.password;
      this.service.ResetNewPassword(this.passModel)
        .subscribe(success =>{
          console.log('success')
        //this.router.navigate(['Login']);
        },error=>{
          console.log("error")
        });
    }
  }
}
