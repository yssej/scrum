import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjetParam } from 'src/app/models/params/projet-param';

@Injectable({
  providedIn: 'root'
})
export class ProjetParamService {

  projetUrl = 'http://localhost:8081/Projet_param/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<ProjetParam[]>{
    return this.httpClient.get<ProjetParam[]>(`${this.projetUrl}`+`list`);
  }

  public create(foo: ProjetParam): Observable<Object>{
    return this.httpClient.post(`${this.projetUrl}`+`save`, foo, this.HttpOptions);
  }

  public getProjetById(id: number): Observable<any>{
    return this.httpClient.get<ProjetParam>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  }

  public update(id: number, foo: ProjetParam): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`, foo, this.HttpOptions);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`, this.HttpOptions);
  }
}
