import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  projetUrl = 'http://localhost:8081/Projet/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Projet[]>{
    return this.httpClient.get<Projet[]>(`${this.projetUrl}`+`list`);
  }

  public findAllOrderByDatecreationAsc(): Observable<Projet[]>{
    return this.httpClient.get<Projet[]>(`${this.projetUrl}`+`listOrderByDatecreationAsc`);
  }

  public findAllOrderByDatecreationDesc(): Observable<Projet[]>{
    return this.httpClient.get<Projet[]>(`${this.projetUrl}`+`listOrderByDatecreationDesc`);
  }

  public create(projet: Projet): Observable<any>{
    return this.httpClient.post(`${this.projetUrl}`+`save`, projet, this.HttpOptions);
  }

  public getProjetById(id: number): Observable<Projet>{
    return this.httpClient.get<Projet>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  }

  public getProjetByIdCreateur(id: number): Observable<Projet[]>{
    return this.httpClient.get<Projet[]>(`${this.projetUrl}`+`createurID`+`/${id}`, this.HttpOptions);
  }

  // public getProjetByIdResponsable(id: number): Observable<Projet[]>{
  //   return this.httpClient.get<Projet[]>(`${this.projetUrl}`+`responsableID`+`/${id}`, this.HttpOptions);
  // }

  public update(id: number, foo: Projet,user:string): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`+`/${user}`, foo, this.HttpOptions);
  }

  public delete(id: number,user:string): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`+`/${user}`, this.HttpOptions);
  }

  public getNumberByEtat(etat:string): Observable<number>{
    return this.httpClient.get<number>(`${this.projetUrl}`+`countByEtat`+`/${etat}`);
  }

  public getByEtat(etat:string): Observable<Projet[]>{
    return this.httpClient.get<Projet[]>(`${this.projetUrl}`+`findByEtat`+`/${etat}`);
  }

  public getByNom(nom:string): Observable<Projet[]>{
    return this.httpClient.get<Projet[]>(`${this.projetUrl}`+`findByEtat`+`/${nom}`);
  }
}
