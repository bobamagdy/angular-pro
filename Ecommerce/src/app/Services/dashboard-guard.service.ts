import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuardService implements CanActivate {

  constructor(private service:AuthService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const email = !!localStorage.getItem('email');
    const role = !!localStorage.getItem('role');
    var roleName=this.service.role;
    if(role){
      if(roleName.toLowerCase()!=='admin'){
        this.router.navigate(['AccessDenied']).then(x=>{window.location.reload()});
      }
      return true;
    }else{
        if(!email || !role){
          this.router.navigate(['NotFound']).then(x=>{window.location.reload()});
        }
      }
      return false;
    }
  }

