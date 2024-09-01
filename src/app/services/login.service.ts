import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private oauthService: OAuthService) { }

  public login(): void {
    this.oauthService.initImplicitFlowInternal();
  }

  public logout(): void {
    this.oauthService.logOut();
  }

  public getIsLogged(): boolean {
    return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
  }

  public getUsername(): string {
    const userclaims: any = this.oauthService.getIdentityClaims();
    return userclaims['preferred_username'];
  }

  public getIsAdmin(): boolean {
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    // console.log(payloadDecoded.realm_access.roles);
    return payloadDecoded.realm_access.roles.indexOf('realm-admin') !== -1;
  }

  public getId(): string {
    const userclaims: any = this.oauthService.getIdentityClaims();
    if (!userclaims) return '';
    return userclaims['sub'];
  }
}