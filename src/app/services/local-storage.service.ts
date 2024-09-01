import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveDataToSessionStorage(key:string,data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getDataFromSessionStorage(key:string): any {
    const data = sessionStorage.getItem(key);
    if (data !== null) {
      return JSON.parse(data);
    } else {
      return null; // or whatever default value you want to return
    }
  }

  removeDataFromSessionStorage(key:string): void {
    sessionStorage.removeItem(key);
  }

}
