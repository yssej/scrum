import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commentaire } from '../models/commentaire';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  projetUrl = 'http://localhost:8081/Commentaire/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Commentaire[]>{
    return this.httpClient.get<Commentaire[]>(`${this.projetUrl}`+`list`);
  }

  public create(commentaire: Commentaire,userID:string): Observable<Object>{
    return this.httpClient.post(`${this.projetUrl}`+`save`+`/${userID}`, commentaire, this.HttpOptions);
  }

  // public createTacheCommentaire(commentaire: Commentaire,userID:string): Observable<Object>{
  //   return this.httpClient.post(`${this.projetUrl}`+`saveTacheCommentaire`+`/${userID}`, commentaire, this.HttpOptions);
  // }

  public getCommentaireById(id: number): Observable<any>{
    return this.httpClient.get<Commentaire>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  }

  public update(id: number, commentaire: Commentaire,userID:string): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`+`/${userID}`, commentaire, this.HttpOptions);
  }

  public delete(id: number,userID:string): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`+`/${userID}`, this.HttpOptions);
  }

  public getCommentairesByIdTache(idTache:number): Observable<Commentaire[]> {
    return this.httpClient.get<Commentaire[]>(`${this.projetUrl}`+`tacheID`+`/${idTache}`);
  }

  public getSoustacheByIdSoustache(id:number): Observable<Commentaire[]> {
    return this.httpClient.get<Commentaire[]>(`${this.projetUrl}`+`soustacheID`+`/${id}`);
  }
  
  public getProjetByIdProjet(id:number): Observable<Commentaire[]> {
    return this.httpClient.get<Commentaire[]>(`${this.projetUrl}`+`projetID`+`/${id}`);
  }
  
  public getCommentaireByIdBacklog(id:number): Observable<Commentaire[]> {
    return this.httpClient.get<Commentaire[]>(`${this.projetUrl}`+`backlogID`+`/${id}`);
  }
  
  public getCommentaireByIdFonctionnalite(id:number): Observable<Commentaire[]> {
    return this.httpClient.get<Commentaire[]>(`${this.projetUrl}`+`fonctionnaliteID`+`/${id}`);
  }

  public getCreateurByIdCreateur(id:string): Observable<Commentaire[]> {
    return this.httpClient.get<Commentaire[]>(`${this.projetUrl}`+`projetID`+`/${id}`);
  }
}
