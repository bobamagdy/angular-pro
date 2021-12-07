import { ResetNewPasswordModel } from '../models/resetNewPassword';
import { LoginModel } from './../models/login-model';
import { User } from './../models/user';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RegisterModel } from '../models/register-model';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class RegisterServiceService {
  @Output() CancelRegister = new EventEmitter();
  constructor(private http: HttpClient) { }
  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();

  baseUrl = 'https://localhost:44395/Account/';
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials:true
  };

  Register(register: RegisterModel): Observable<RegisterModel> {
    return this.http.post<RegisterModel>(this.baseUrl + 'Register', register, this.headers).pipe();
  }

  GetAllusers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'GetAllUsers').pipe();
  }

  Login(logModel: LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(this.baseUrl + 'Login', logModel, this.headers).pipe();
  }
 // public loginUser = (route: string, body: LoginModel) => {
  //  return this.http.post(this.createCompleteRoute(route, this.baseUrl), body);
 // }

  Logout(): Observable<any> {
    return this.http.get(this.baseUrl + 'Logout',{withCredentials:true,}).pipe();
  }

  EmailConfirm(id:string,token:string){
    return this.http.get(this.baseUrl + 'RegisterationConfirm?ID='+id+'&Token='+token).pipe();

  }

  UserNameExist(userName:string){
    return this.http.get(this.baseUrl+'UserNameExists?userName='+userName).pipe();
  }

  EmailExist(email:string){
    return this.http.get(this.baseUrl+'EmailExists?email='+email).pipe();
  }

  ForgetPassword(email:string){
    return this.http.get(this.baseUrl+'ForgetPassword/'+email).pipe();
  }

  ResetNewPassword(passModel:ResetNewPasswordModel): Observable<ResetNewPasswordModel>{
    return this.http.post<ResetNewPasswordModel>(this.baseUrl + 'ResetPassword', passModel).pipe();
  }


}
