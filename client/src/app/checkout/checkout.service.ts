import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPlanSummary } from '../shared/models/planSummary';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl= environment.apiUrl;

  constructor(private http: HttpClient) { }


  createPaymentIntent(plan: IPlanSummary){
    console.log(plan);
    debugger;
    return this.http.post(this.baseUrl + 'payment/NewPaymentIntent' , plan );
  }
}
