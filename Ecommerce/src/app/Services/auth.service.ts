import { CryptoService } from './crypto.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  email:string;
  expire:string;
  role:string;


  constructor(private http: HttpClient, private service: CryptoService) {
    if(this.isUserRegistered()){
      this.expire = this.service.Decrypt(localStorage.getItem('expire') as string);
      this.email = this.service.Decrypt(localStorage.getItem('email') as string);
      this.role = this.service.Decrypt(localStorage.getItem('role') as string);
  }
}
  baseUrl = 'https://localhost:44395/Account/';

  installStorage(rem: boolean, email: string) {
    const day = new Date();
    if (rem) {
      day.setDate(day.getDate() + 10);
    } else {
      day.setMinutes(day.getMinutes() + 1);
    }
    localStorage.setItem('email', this.service.Encrypt(email));
    localStorage.setItem('expire', this.service.Encrypt(day.toString()));
    this.GetRoleName(email).subscribe(
      (success) => {
        localStorage.setItem('role', this.service.Encrypt(success));
      },
      (error) => console.log(error)
    );
  }



   GetRoleName(email: string) {
    return this.http
      .get(this.baseUrl + 'GetRoleName/' + email, { responseType: 'text' })
      .pipe();
  }

   ValidateUser(email: string, role: string) {
    return this.http
      .get(this.baseUrl + 'CheckUserClaims/' + email + '&' + role ,{withCredentials:true,})
      .pipe();
  }


  IsExpiredDate(day:string){
    const dateNow=new Date();
    const dateExpire=new Date(Date.parse(day));
    if(dateExpire<dateNow){
      localStorage.clear();
      return true;
    }
    return false;
  }

  isUserRegistered() {
    const email = !!localStorage.getItem('email');
    const expire = !!localStorage.getItem('expire');
    const role = !!localStorage.getItem('role');
    if (email && expire && role) {
      return true;
    }
    return false;
  }

}
