import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-email-activation',
  templateUrl: './email-activation.component.html',
  styleUrls: ['./email-activation.component.css']
})
export class EmailActivationComponent implements OnInit{

  userId:string;
  user:User;

  constructor(private route:ActivatedRoute,private http:HttpClient,private userService:UserService) {
  }

  ngOnInit(): void {
    this.getData();
    this.getUser();
  }

  getUser() {
    this.userService.getUserById(this.route.snapshot.params['id']).subscribe( data => {
      this.user = data;
    });
  }

  getData() {
    const token = this.route.snapshot.params['token'];

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.put<User[]>('http://localhost:8081/User/activateCount'+`/${this.route.snapshot.params['id']}`, { headers }).subscribe(data => {
      console.log(data);
    });
  }
}
