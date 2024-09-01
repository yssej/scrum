import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fichier } from '../models/fichier';

@Injectable({
  providedIn: 'root'
})
export class FichierService {

  projetUrl = 'http://localhost:8081/Fichier/';
  HttpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Fichier[]>{
    return this.httpClient.get<Fichier[]>(`${this.projetUrl}`+`list`);
  }

  public create(foo: Fichier): Observable<Object>{
    return this.httpClient.post(`${this.projetUrl}`+`create`, foo, this.HttpOptions);
  }

  public getProjetById(id: number): Observable<any>{
    return this.httpClient.get<Fichier>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  }

  public update(id: number, foo: Fichier): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`, foo, this.HttpOptions);
  }

  public delete(id: number,userID:string): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`delete`+`/${id}`+`/${userID}`, this.HttpOptions);
  }

  public deleteByIdUser(id: string): Observable<any>{
    return this.httpClient.delete(`${this.projetUrl}`+`deleteByIdUser`+`/${id}`, this.HttpOptions);
  }

  public savePDP(formdata:FormData): Observable<string[]> {
    return this.httpClient.post<string[]>(`${this.projetUrl}savePDP`, formdata);
  }

  public getFichierByIdProjet(id: number): Observable<Fichier[]>{
    return this.httpClient.get<Fichier[]>(`${this.projetUrl}`+`projetID`+`/${id}`, this.HttpOptions);
  }

  public getFichierByIdTache(idTache: number): Observable<Fichier[]>{
    return this.httpClient.get<Fichier[]>(`${this.projetUrl}`+`tacheID`+`/${idTache}`, this.HttpOptions);
  }

  public getFichierByIdCommentaire(id: number): Observable<Fichier[]>{
    return this.httpClient.get<Fichier[]>(`${this.projetUrl}`+`commentaireID`+`/${id}`, this.HttpOptions);
  }

  public getFichierByUserId(id: string): Observable<Fichier>{
    return this.httpClient.get<Fichier>(`${this.projetUrl}`+`userID`+`/${id}`, this.HttpOptions);
  }

  public getCommentairesFichiers(): Observable<Fichier[]>{
    return this.httpClient.get<Fichier[]>(`${this.projetUrl}`+`getCommentairesFichiers`, this.HttpOptions);
  }

  public getCommentairesFichiersByIdProjet(idProjet:number): Observable<Fichier[]>{
    return this.httpClient.get<Fichier[]>(`${this.projetUrl}`+`getCommentairesFichiersByIdProjet`+`/${idProjet}`, this.HttpOptions);
  }

  public getUsersPhoto(): Observable<Fichier[]>{
    return this.httpClient.get<Fichier[]>(`${this.projetUrl}`+`getUsersPhoto`, this.HttpOptions);
  }

  public getProjetsFichiers(): Observable<Fichier[]>{
    return this.httpClient.get<Fichier[]>(`${this.projetUrl}`+`getProjetsFichiers`, this.HttpOptions);
  }

  public getTacheFichiers(): Observable<Fichier[]>{
    return this.httpClient.get<Fichier[]>(`${this.projetUrl}`+`getTacheFichiers`, this.HttpOptions);
  }

  public savePDPOldUser(id:string,formdata:FormData): Observable<string[]> {
    return this.httpClient.post<string[]>(`${this.projetUrl}savePDPOldUser`+`/${id}`, formdata);
  }

  public saveCommentFile(id:number,formdata:FormData,userID:string,commentaire:string): Observable<string[]> {
    return this.httpClient.post<string[]>(`${this.projetUrl}saveCommentFile`+`/${id}`+`/${userID}`+`/${commentaire}`, formdata);
  }

  public saveCommentFileBacklog(idBacklog:number,idProjet:number,formdata:FormData,userID:string,commentaire:string): Observable<string[]> {
    return this.httpClient.post<string[]>(`${this.projetUrl}saveCommentFileBacklog`+`/${idBacklog}`+`/${idProjet}`+`/${userID}`+`/${commentaire}`, formdata);
  }

  public saveCommentFileFonctionnalite(idFonctionnalite:number,idProjet:number,formdata:FormData,userID:string,commentaire:string): Observable<string[]> {
    return this.httpClient.post<string[]>(`${this.projetUrl}saveCommentFileFonctionnalite`+`/${idFonctionnalite}`+`/${idProjet}`+`/${userID}`+`/${commentaire}`, formdata);
  }

  public saveCommentFileTache(idTache:number,idProjet:number,formdata:FormData,userID:string,commentaire:string): Observable<string[]> {
    return this.httpClient.post<string[]>(`${this.projetUrl}saveCommentFileTache`+`/${idTache}`+`/${idProjet}`+`/${userID}`+`/${commentaire}`, formdata);
  }

  public saveProjectFile(id:number,userID:string,formdata:FormData): Observable<string[]> {
    return this.httpClient.post<string[]>(`${this.projetUrl}saveProjectFile`+`/${id}`+`/${userID}`, formdata);
  }

  public saveCommentTaskFile(idTache:number,formdata:FormData,userID:string): Observable<string[]> {
    return this.httpClient.post<string[]>(`${this.projetUrl}saveCommentTaskFile`+`/${idTache}`+`/${userID}`, formdata);
  }

  public saveTaskFile(idTache:number,userID:string,formdata:FormData): Observable<string[]> {
    return this.httpClient.post<string[]>(`${this.projetUrl}saveTaskFile`+`/${idTache}`+`/${userID}`, formdata);
  }

  public setUserPhoto(id: string, formdata:FormData): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`updatePDP`+`/${id}`, formdata, this.HttpOptions);
  }

  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.httpClient.get(`${this.projetUrl}download/${filename}/`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }
}
