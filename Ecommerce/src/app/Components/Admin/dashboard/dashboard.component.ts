import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  isUserList:boolean;
  isAddUser:boolean;
  isUserRoleList:boolean;
  ngOnInit(): void {
    this.isUserList=false;
    this.isUserRoleList=false;
    this.isAddUser=false;
    $(document).ready(function () {
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
    });

  }
  CheckUser():boolean{
    this.isAddUser=false;
    this.isUserRoleList=false;
    return this.isUserList=true;
  }
  AddUser():boolean{
    this.isUserList=false;
    this.isUserRoleList=false;
    return this.isAddUser=true;
  }
  CheckUserRoleList():boolean{
    this.isAddUser=false;
    this.isUserList=false;
    return this.isUserRoleList=true;
  }
}
