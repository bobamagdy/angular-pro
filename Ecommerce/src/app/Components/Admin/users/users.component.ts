import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private service:AdminService,private router:Router) { }
  users:User[];

  ngOnInit(): void {

    this.users=[];
    this.service.GetAllusers().subscribe((list)=>{this.users=list},
    err=>console.log(err)
    );
  }
   EditUserClick(id:string){
    this.router.navigate(['/EditUser',id])
  }
}
