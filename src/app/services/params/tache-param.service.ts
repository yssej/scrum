import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TacheParam } from 'src/app/models/params/tache-param';

@Injectable({
  providedIn: 'root'
})
export class TacheParamService {

  projetUrl = 'http://localhost:8081/Tache_param/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<TacheParam[]>{
    return this.httpClient.get<TacheParam[]>(`${this.projetUrl}`+`list`);
  }

  public create(foo: TacheParam): Observable<Object>{
    return this.httpClient.post(`${this.projetUrl}`+`save`, foo, this.HttpOptions);
  }

  public getProjetById(id: number): Observable<any>{
    return this.httpClient.get<TacheParam>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  }

  public update(id: number, foo: TacheParam): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`, foo, this.HttpOptions);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`, this.HttpOptions);
  }
}
