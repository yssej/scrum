import { Component, OnInit } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { LoginService } from './services/login.service';
import { MessageService } from './services/message.service';

interface sideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'SCRUM';
  isLogged: boolean;
  isAdmin: boolean;
  isPO:boolean;
  isSM:boolean;
  isDev:boolean;
  username: string;
  role: string;
  userId: string;
  roles:string[];

  isSidenavCollapsed = false;
  screenWidth = 0;

  messages: string[] = [];

  ngOnInit(): void {
    if(this.login.getIsLogged()) { 
      this.isLogged = this.getIsLogged();
      this.isAdmin = this.getIsAdmin();
      this.isSM = this.getIsSM();
      this.isPO = this.getIsPO();
      this.isDev = this.getIsDev();
      this.username = this.getUsername();
      
      this.role = this.getRole();
      this.userId = this.getId();
      this.getRoles();
    }
  }

  constructor(private oauthService: OAuthService,private login: LoginService,private messageService:MessageService) {
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/Gestion_test',
    redirectUri: window.location.origin,
    clientId: 'gestion',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };

  configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin())
    .then(() => {
      if(this.oauthService.getIdentityClaims()) {
        this.isLogged = this.getIsLogged();
        this.isAdmin = this.getIsAdmin();
        this.isSM = this.getIsSM();
        this.isPO = this.getIsPO();
        this.isDev = this.getIsDev();
        this.username = this.getUsername();
        this.messageService.sendMessage(this.username);
        this.role = this.getRole();
        this.userId = this.getId();
      }
    })
  }

  public getIsLogged(): boolean {
    return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
  }

  public getRole(): string {
    let rep = '';
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    if (payloadDecoded.realm_access.roles.indexOf('Administrateur') !== -1) {
      rep = 'administrateur';
    } else if (payloadDecoded.realm_access.roles.indexOf('agent_testeur') !== -1) {
      rep = 'agent_testeur';
    } else if (payloadDecoded.realm_access.roles.indexOf('moderateur_testeur') !== -1) {
      rep = 'moderateur_testeur';
    } else if (payloadDecoded.realm_access.roles.indexOf('moderateur_intervenant') !== -1) {
      rep = 'moderateur_intervenant';
    } else if (payloadDecoded.realm_access.roles.indexOf('agent_intervenant') !== -1) {
      rep = 'agent_intervenant';
    }
    return rep;
  }

  public getRol(token: string): string {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }

  public getIsAdmin(): boolean {
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    return payloadDecoded.realm_access.roles.indexOf('Administrateur') !== -1;
  }

  public getIsPO(): boolean {
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    return payloadDecoded.realm_access.roles.indexOf('Product_owner') !== -1;
  }

  public getIsSM(): boolean {
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    return payloadDecoded.realm_access.roles.indexOf('SCRUM_master') !== -1;
  }

  public getIsDev(): boolean {
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    return payloadDecoded.realm_access.roles.indexOf('Développeur') !== -1;
  }

  public getRoles(): string[] {
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    return payloadDecoded.realm_access.roles;
  }

  public getUsername(): string {
    const userclaims: any = this.oauthService.getIdentityClaims();
    return userclaims['preferred_username'];
  }
  
  public getId(): string {
    const userclaims: any = this.oauthService.getIdentityClaims();
    return userclaims['sub'];
  }

  onToggleSidenav(data: sideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSidenavCollapsed = data.collapsed;
  }

}
