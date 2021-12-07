import { RegisterServiceService } from 'src/app/Services/registerService.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(
    private service: RegisterServiceService,
    private route: Router,
    private auth: AuthService
  ) { }
  title = "Ecommerce";

  ngOnInit(): void {
    if (this.isUserRegistered()) {
      if(this.auth.IsExpiredDate(this.auth.expire)===true){
        this.logout();
      }
      this.auth.ValidateUser(this.auth.email,this.auth.role).subscribe(success=>{
        console.log('user is autherized');
      },error=>{
        console.log(error);
        this.logout();
      });
    }

  }



  logout() {
    this.service.Logout().subscribe(success => {
      localStorage.clear();
      console.log("autherization is false")
      this.route.navigate(['Home']).then(x=>{window.location.reload();});
    }, err => {
      console.log(err);
    });
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

  IsAdmin(){
    var isAdmin=!!this.auth.role;
    if(isAdmin){
     if(this.auth.role.toLowerCase()=='admin'){
     return true;
    }
    }
    return false;
  }

}

