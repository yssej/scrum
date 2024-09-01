import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  projetUrl = 'http://localhost:8081/Role/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  // public list(): Observable<Role[]>{
  //   return this.httpClient.get<Role[]>(`${this.projetUrl}`+`allRoles`);
  // }

  // public create(roleName: String): Observable<Object>{
  //   return this.httpClient.post(`${this.projetUrl}`+`save`+`/${roleName}`, this.HttpOptions);
  // }

  // public addRoleToUser(user: string, role:string): Observable<any>{
  //   return this.httpClient.put(`${this.projetUrl}`+`addRole`+`/${user}`+`/${role}`, this.HttpOptions);
  // }

  // public removeRoleToUser(user: string, role:string): Observable<any>{
  //   return this.httpClient.put(`${this.projetUrl}`+`removeRole`+`/${user}`+`/${role}`, this.HttpOptions);
  // }

  public list(): Observable<Role[]>{
    return this.httpClient.get<Role[]>(`${this.projetUrl}`+`allClientRoles`);
  }

  public create(roleName: String): Observable<Object>{
    return this.httpClient.post(`${this.projetUrl}`+`saveGestionClientRole`+`/${roleName}`, this.HttpOptions);
  }

  public addRoleToUser(user: string, role:string): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`addClientRole`+`/${user}`+`/${role}`, this.HttpOptions);
  }
  
  public removeRoleToUser(user: string, role:string): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`removeClientRole`+`/${user}`+`/${role}`, this.HttpOptions);
  }
}
