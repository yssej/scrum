import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { OAuthService } from 'angular-oauth2-oidc';

interface sideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':enter', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
        keyframes([
          style({transform: 'rotate(0deg)', offset: '0'}),
          style({transform: 'rotate(2turn)', offset: '1'})
        ]))
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {

  @Output() onToggleSidenav: EventEmitter<sideNavToggle> = new EventEmitter();
  @Input() isLogged: boolean;
  @Input() isAdmin: boolean;
  @Input() isPO: boolean;
  @Input() isSM: boolean;
  @Input() isDev: boolean;
  @Input() roles: string[];
  collapsed = false;
  screenWidth = 0;
  // isLogged:boolean;
  navData = navbarData;
  actualUser:User;
  isAdmini:boolean;
  isProductOwner:boolean;
  isScrumMaster:boolean;
  isDevelloper:boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  constructor(private userService:UserService,private loginService:LoginService,private oauthService:OAuthService) {
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    if(this.loginService.getIsLogged()) {this.isLogged = true; this.getRoles();this.getActualUser();}
  }

  public getRoles() {
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    this.roles = payloadDecoded.realm_access.roles;
  }

  getActualUser() {
    this.isAdministrateur();
    this.isProductOnwer();
    this.isScMa();
    this.isDevello();
  }

  isAdministrateur():boolean {
    if(this.roles.includes('Administrateur')) this.isAdmini = true;
    return this.isAdmini;
  }

  isProductOnwer():boolean {
    if(this.roles.includes('Product_owner')) this.isProductOwner = true;
    return this.isProductOwner;
  }

  isScMa():boolean {
    if(this.roles.includes('SCRUM_master')) this.isScrumMaster = true;
    return this.isScrumMaster;
  }

  isDevello():boolean {
    if(this.roles.includes('Développeur')) this.isDevelloper = true;
    return this.isDevelloper;
  }

}
