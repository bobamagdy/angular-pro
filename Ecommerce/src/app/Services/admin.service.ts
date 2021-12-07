import { UserRoleModel } from './../models/UserRoleModel';
import { EditUserModel } from './../models/EditUserModel';
import { UserModel } from './../models/UserModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://localhost:44395/Admin/';
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      , 'Authorization': "Bearer " + localStorage.getItem('Token')
    }),
    withCredentials: true
  };
  GetAllusers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'GetAllUsers', this.headers);
  }
  AddNewUser(model:UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.baseUrl + 'AddNewUser', model, this.headers);
  }
  //EditUser(id:string):Observable<User>{
    //return this.http.get<User>(this.baseUrl + 'EditUser/', this.headers).pipe();
  //}
  GetUserData(id:string):Observable<User>{
    return this.http.get<User>(this.baseUrl + 'GetUserData/' + id, this.headers).pipe();
  }

  EditUserData(model:EditUserModel):Observable<User>{
    return this.http.put<User>(this.baseUrl+'EditUserData',model,this.headers).pipe();
  }

  GetUserRole(): Observable<UserRoleModel[]> {
    return this.http.get<UserRoleModel[]>(this.baseUrl + 'GetUserRole', this.headers);
  }
}





