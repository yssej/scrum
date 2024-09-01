import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sprint } from '../models/sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  projetUrl = 'http://localhost:8081/Sprint/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Sprint[]>{
    return this.httpClient.get<Sprint[]>(`${this.projetUrl}`+`list`);
  }

  public create(sprint: Sprint,userID:string): Observable<Object>{
    return this.httpClient.post(`${this.projetUrl}`+`save`+`/${userID}`, sprint, this.HttpOptions);
  }

  public getSprintById(id: number): Observable<any>{
    return this.httpClient.get<Sprint>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  }

  public getSprintByIdProjet(id: number): Observable<Sprint[]>{
    return this.httpClient.get<Sprint[]>(`${this.projetUrl}`+`projetID`+`/${id}`, this.HttpOptions);
  }

  public getSprintByIdCreateur(id: number): Observable<Sprint[]>{
    return this.httpClient.get<Sprint[]>(`${this.projetUrl}`+`createurID`+`/${id}`, this.HttpOptions);
  }

  public update(id: number, foo: Sprint,userID:string): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`+`/${userID}`, foo, this.HttpOptions);
  }

  public delete(id: number,userID:string): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`+`/${userID}`, this.HttpOptions);
  }
}
