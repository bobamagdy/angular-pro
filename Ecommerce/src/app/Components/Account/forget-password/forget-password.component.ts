import { CryptoService } from './../../../Services/crypto.service';
import { RegisterServiceService } from './../../../Services/registerService.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(
    private service:RegisterServiceService,
    private fb:FormBuilder,
    private encService:CryptoService
  ) { }

  message:string;
  forgetForm:FormGroup;
  messageValidate = {
    email: {
      required: 'email is required',
      patt:'emial is not in correct format'
    },
  }

  ngOnInit(): void {
    this.message='';
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required,Validators.pattern]],
    });
  }



  RequestPassword(){
    var email=this.forgetForm.value.email;
    if(email!==null||email!==''){
      this.service.ForgetPassword(email).subscribe(
        success=>{
          var i=0;
          var exist=false;
          var token=Object.values(success).toString();
          while(localStorage.getItem('token'+i)!==null){
            i++;
            if(localStorage.getItem('token'+i)===null){
          localStorage.setItem('token'+i,this.encService.Encrypt(token));
              exist=true;
              break;
            }
          }
          if(!exist){
          localStorage.setItem('token'+i,this.encService.Encrypt(token));
          }
          this.message="Check Your Email..."
        },
        error=>{console.log(error)}
      )
    }
  }
}
