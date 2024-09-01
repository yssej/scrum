import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  user:User = new User();
  token:any;
  users:User[];

  constructor(private userService:UserService,private router:Router) {}

  ngOnInit(): void {
    this.getToken();
  }

  onSubmit(){
    console.log(this.user);
    this.signUp();
    this.router.navigate(['/']);
  }

  signUp() {
    console.log(this.token);
    this.userService.create(this.user,this.user.password,this.token).subscribe(data => {
      console.log(data);
    },
    error => console.log(error));
  }

  getToken() {
    this.userService.getToken().subscribe(data => {
      this.token = data;
      console.log(data)
    },
    error => console.log(this.token));
  }

  getUsers() {
    this.userService.list().subscribe(data => {
      this.users = data;
      console.log(data)
    },
    error => console.log(error));
  }
}
