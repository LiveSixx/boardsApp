import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
const URL = '../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private http: HttpClient) {}

 getData() {
  console.log(URL)
   return this.http.get(URL)
 }
}
