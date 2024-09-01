import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Role } from '../models/role';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  projetUrl = 'http://localhost:8081/User/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public getToken(): Observable<string>{
    return this.httpClient.get<string>(`${this.projetUrl}`+`token`, { headers: new HttpHeaders().set('Authorization', 'Bearer token') })
  }

  public list(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.projetUrl}`+`users`);
  }

  // public usersWithTheirRoles(): Observable<User[]>{
  //   return this.httpClient.get<User[]>(`${this.projetUrl}`+`userswithrole2`);
  // }

  public usersWithTheirRoles(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.projetUrl}`+`userswithClientrole`);
  }

  // public getUsersByRole(role:string): Observable<User[]>{
  //   return this.httpClient.get<User[]>(`${this.projetUrl}`+`getUsersByRole`+`/${role}`);
  // }

  public getUsersByRole(role:string): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.projetUrl}`+`getUsersByClientRole`+`/${role}`);
  }

  // public userWithRole(idUser:string): Observable<User>{
  //   return this.httpClient.get<User>(`${this.projetUrl}`+`userWithRole`+`/${idUser}`);
  // }

  public userWithRole(idUser:string): Observable<User>{
    return this.httpClient.get<User>(`${this.projetUrl}`+`userWithClientRoles`+`/${idUser}`);
  }

  public create(newUser: User,password: string,token:string): Observable<Object>{
    return this.httpClient.post(`${this.projetUrl}`+`save`+`/${password}`+`/${token}`, newUser, this.HttpOptions);
  }

  public getUserById(id: string): Observable<any>{
    return this.httpClient.get<User>(`${this.projetUrl}`+`getUserById`+`/${id}`, this.HttpOptions);
  }

  public getUserByUsername(username: string): Observable<any>{
    return this.httpClient.get<User>(`${this.projetUrl}`+`getUserByUsername`+`/${username}`, this.HttpOptions);
  }

  public update(id: string, user: User): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`, user, this.HttpOptions);
  }

  public delete(id: string): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`, this.HttpOptions);
  }

  // public getRolesNotToUser(idUser: string): Observable<Role[]>{
  //   return this.httpClient.get<Role[]>(`${this.projetUrl}`+`getRolesNotToUser`+`/${idUser}`);
  // }

  public getRolesNotToUser(idUser: string): Observable<Role[]>{
    return this.httpClient.get<Role[]>(`${this.projetUrl}`+`getClientRolesNotToUser`+`/${idUser}`);
  }

  public updateUserDetail(id: string, user: User): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`updateUserDetail`+`/${id}`, user, this.HttpOptions);
  }

  public setUserPassword(id: string, password: string): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`setUserPassword`+`/${id}`+`/${password}`, this.HttpOptions);
  }

  public activateCount(idUser:string): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`activateCount`+`/${idUser}`, this.HttpOptions);
  }

  public isProductOwner(user:User):boolean {
    let ans = false;
    if(user.realmRoles && user.realmRoles.includes('Product_owner')) ans = true;
    return ans;
  }

  public isScrumMaster(user:User):boolean {
    let ans = false;
    if(user.realmRoles && user.realmRoles.includes('SCRUM_master')) ans = true;
    return ans;
  }

  public isDeveloppeur(user:User):boolean {
    let ans = false;
    if(user.realmRoles && user.realmRoles.includes('Développeur')) ans = true;
    return ans;
  }

  public isAdministrateur(user:User):boolean {
    let ans = false;
    if(user.realmRoles && user.realmRoles.includes('Administrateur')) ans = true;
    return ans;
  }
}
