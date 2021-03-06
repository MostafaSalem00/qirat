import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMetal } from '../shared/models/metal';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient) { }

  getMetals(){
    return this.http.get<IMetal>( this.baseUrl + 'metals');
  }
}
