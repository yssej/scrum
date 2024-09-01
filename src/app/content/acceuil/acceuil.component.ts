import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  isLogged = this.loginService.getIsLogged();
  username:string;

  constructor( private loginService:LoginService,private router:Router,private messageService:MessageService ) { }

  ngOnInit(): void {
    if(this.loginService.getIsLogged()) {
      this.router.navigate(['/Projet']);
    }
    this.messageService.getMessage().subscribe( res => {
      this.username = res['text'];
    });
  }

  login(): void {
    this.loginService.login();
  }

  logout(): void {
    this.loginService.logout();
  }

}
