import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }

  constructor(private sessionStorage:LocalStorageService,private login:LoginService) { }

  ngOnInit(): void {
    if(this.login.getIsLogged() == false) {
      this.sessionStorage.removeDataFromSessionStorage("projetWorking");
    }
  }

}
