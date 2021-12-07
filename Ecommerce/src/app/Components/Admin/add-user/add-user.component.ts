import { EditUserModel } from './../../../models/EditUserModel';
import { PasswordConfirmComponent } from './../../Account/password-confirm/password-confirm.component';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from './../../../models/UserModel';
import { AdminService } from './../../../Services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private activatedRoute: ActivatedRoute
  ) {}
  id:string;
  editUserData:EditUserModel;
  userForm: FormGroup;
  message: string;
  errorMsg: string;
  isBusy: boolean;
  user: UserModel;
  users: User[];
  regex: RegExp;
  title: string;
  btnTitle: string;
  userData: User;
  isEditMode:boolean;
  messageValidate = {
    userName: {
      required: 'user name is required',
      repeat: 'user name is already used',
    },
    email: {
      required: 'email is required',
      notValid: 'email is incorect format',
      repeat: 'Email is already used',
    },
    password: {
      required: 'password is required',
      minlength: 'password must be 6 characters',
      notMatch:
        'password should contain(upperCase letter,lowerCase letter,special character) ',
    },
    passwordConfirm: {
      required: 'Confirm password is required',
      minlength: 'password must be 6 characters',
      isMatch: 'must match with your password',
    },
  };
  ngOnInit(): void {
this.id='';
    this.message = '';
    this.errorMsg = '';
    this.title = 'Add New User';
    this.btnTitle = 'Add User';
    this.isEditMode=false;
    this.users = [];
    this.userData = {
      id: '',
      country: '',
      userName: '',
      normalizedUserName: '',
      email: '',
      normalizedEmail: '',
      emailConfirmed: false,
      passwordHash: '',
      securityStamp: '',
      concurrencyStamp: '',
      phoneNumber: '',
      phoneNumberConfirmed: false,
      twoFactorEnabled: false,
      lockoutEnd: new Date(''),
      lockoutEnabled: false,
      accessFailedCount: 0,
    };
    this.user = {
      userName: '',
      email: '',
      password: '',
      emailConfirmed: false,
      phoneNumber: '',
      country: '',
    };
    this.editUserData={
      id:'',
      userName: '',
      email: '',
      password: '',
      emailConfirmed: false,
      phoneNumber: '',
      country: '',
    }
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.min(6)]],
      passwordConfirm: ['', [Validators.required, Validators.min(6)]],
      emailConfirmed: false,
      phoneNumber: '',
      country: '',
    });
    this.isBusy = false;

    this.userForm.valueChanges.subscribe(
      (x) => {
        if (this.userForm.status == 'VALID') {
          console.log('form is valid');
          this.isBusy = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );

    this.GetAllUsers();

    this.activatedRoute.paramMap.subscribe((param) => {
      var id = param.get('id');

      if (id) {
        this.id=id;
        this.service.GetUserData(id).subscribe(
          (x) => {
            this.userData=x;
          this.title="Edit User";
        this.btnTitle="Update & Save";
        this.isEditMode=true;
            this.AddUserData();
      },
          (err) => console.log(err)
        );
      }
    });
  }
  AddUserData() {
    if(this.userData!==null){
      this.userForm.patchValue({
        userName: this.userData.userName,
      email: this.userData.email,
      password: this.userData.passwordHash,
      passwordConfirm: this.userData.passwordHash,
      emailConfirmed: this.userData.emailConfirmed,
      phoneNumber: this.userData.phoneNumber,
      country: this.userData.country})
    }
  }

  AddNewUser() {
    if (this.userForm.valid) {
      if(!this.isEditMode){
        this.user.userName = this.userForm.value.userName;
      this.user.email = this.userForm.value.email;
      this.user.password = this.userForm.value.password;
      this.user.emailConfirmed = this.userForm.value.emailConfirmed;
      this.user.phoneNumber = this.userForm.value.phoneNumber;
      this.user.country = this.userForm.value.country;
      this.service.AddNewUser(this.user).subscribe(
        (success) => {
          this.ngOnInit();
          this.message = 'User is added successfully';
        },
        (error) => (this.errorMsg = error)
      );
      }else{
        this.editUserData.id=this.id;
        this.editUserData.userName = this.userForm.value.userName;
        this.editUserData.email = this.userForm.value.email;
        this.editUserData.password = this.userForm.value.password;
        this.editUserData.emailConfirmed = this.userForm.value.emailConfirmed;
        this.editUserData.phoneNumber = this.userForm.value.phoneNumber;
        this.editUserData.country = this.userForm.value.country;

        this.service.EditUserData(this.editUserData)
          .subscribe(x=>{this.message="Update user data is successfully"},
          ex=>console.log(ex));
      }

    }
  }

  isPasswordMatch() {
    if (
      this.userForm.value.password !== ' ' &&
      this.userForm.value.passwordConfirm !== ' '
    ) {
      if (
        this.userForm.value.password !== this.userForm.value.passwordConfirm &&
        this.userForm.value.password.length > 5 &&
        this.userForm.value.passwordConfirm.length > 5
      ) {
        return true;
      }
    }
    return false;
  }

  isPasswordValid() {
    const pass = this.userForm.value.password;
    if (
      this.userForm.value.password !== ' ' &&
      this.userForm.value.passwordConfirm !== ' '
    ) {
      if (pass !== '' && pass.length > 5) {
        this.regex = new RegExp('[a-z]');
        if (!this.regex.test(pass)) {
          this.messageValidate.password.notMatch =
            'password should contain lowercase letter';
          return false;
        }
        this.regex = new RegExp('[A-Z]');
        if (!this.regex.test(pass)) {
          this.messageValidate.password.notMatch =
            'password should contain uppercase letter';
          return false;
        }
        this.regex = new RegExp('[~!@#$%^&*()+<>{}_]');
        if (!this.regex.test(pass)) {
          this.messageValidate.password.notMatch =
            'password should contain special character';
          return false;
        }
        this.regex = new RegExp('[0-9]');
        if (!this.regex.test(pass)) {
          this.messageValidate.password.notMatch =
            'password should contain at least 1 number';
          return false;
        }
      }
      return true;
    }
    return true;
  }

  isUserNameExist() {
    var name = this.userForm.value.userName;
    if (name !== null && name !== '') {
      for (const user of this.users.values()) {
        if (user.userName === name&&!this.isEditMode) {
          return true;
        }else if (this.isEditMode&&user.userName===name&&user.id!==this.userData.id){
          return true;
        }
      }
    }
    return false;
  }

  isEmailExist() {
    var email = this.userForm.value.email;
    if (email !== null && email !== '') {
      for (const item of this.users.values()) {
        if (item.email === email&&!this.isEditMode) {
          return true;
        }else if (this.isEditMode&&item.email===email&&item.id!==this.userData.id){
          return true;
        }
      }
    }
    return false;
  }

  GetAllUsers() {
    this.service.GetAllusers().subscribe(
      (list) => {
        this.users = list;
      },
      (err) => console.log(err)
    );
  }
}
