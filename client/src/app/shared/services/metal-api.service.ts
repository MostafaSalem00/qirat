import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {  interval, Observable, ReplaySubject, Subscription, timer} from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { IMetal } from '../../shared/models/metal';
import { MetalEnum } from '../models/metalenum';
import { IRates } from '../models/rates';

@Injectable({
  providedIn: 'root'
})
export class MetalApiService  {

  subscription: Subscription;
  
  private actualMetalSource = new ReplaySubject<IMetal>(1);
  actualMetalSource$ = this.actualMetalSource.asObservable();

  private curentMetalList = new ReplaySubject<any[]>(1);
  currentMetalList$ = this.curentMetalList.asObservable();


  constructor(private http: HttpClient) { }

  
  fetchMetalEveryXSecond(){
    
    this.subscription = timer(0, 300000).pipe(
      switchMap(() => this.callMetalApi())
    ).subscribe((result: IMetal) => {
      this.actualMetalSource.next(result);
      this.shapMetalToList(result.rates);
      console.log(result);
    });
  }

  callMetalApi(){
    return this.http.get('https://metals-api.com/api/latest?access_key=r3rj96h3261f967i8f26656pffjvuk90l94runa5hw9jrh25nlfkc6s99ow0&base=USD&symbols=XAU,XAG,XPD,XPT,XRH')
      
  }

  shapMetalToList(rate: IRates){

    var obj : any[] = [];

    Object.entries(rate).map(function(key,index){

      if( key[0] == "USD" ||  key[0] == "XRH")
      return;
      
      Object.entries(MetalEnum).map(function(key2) {
        if(key2[0] == key[0]){
          console.log(key);
          console.log(key2);
          obj.push({'Index': index, 'Name' : key[0] , 'Value' : key[1], 'Title' : key2[1]});
        }
      });
      
    });
    console.log(obj);
      this.curentMetalList.next(obj);
  }

  hasValue(value: any) {
    return value !== null && value !== undefined;
  }

   getValue<T>(observable: Observable<T>): Promise<T> {
    return observable
      .pipe(
        filter(this.hasValue),
        first()
      )
      .toPromise();
  }
  
}
