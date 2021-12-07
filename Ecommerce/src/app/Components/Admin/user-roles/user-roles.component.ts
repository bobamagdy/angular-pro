import { AdminService } from 'src/app/Services/admin.service';
import { UserRoleModel } from './../../../models/UserRoleModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {
  constructor(private service:AdminService) { }
  userRoles:UserRoleModel[];
  ngOnInit(): void {
    this.userRoles=[];
    this.GetUserRole();
  }
  GetUserRole(){
    this.service.GetUserRole().subscribe(list=>{
      this.userRoles=list;
    },
      ex=>console.log(ex));
  }
}
