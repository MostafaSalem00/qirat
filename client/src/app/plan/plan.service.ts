import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { INewPlan } from '../shared/models/newPlan';
import { IMetalType } from '../shared/models/metalType';
import { IPlanType } from '../shared/models/planType';
import { IMetal } from '../shared/models/metal';
import { Observable, of } from 'rxjs';
import { IPlanInfo } from '../shared/models/planInfo';
import { IUserPlans } from '../shared/models/userPlans';
import { IPlan } from '../shared/models/plan';
import { IPlanOrder } from '../shared/models/planOrder';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMetalListAsync() {
    return this.http.get<IMetalType[]>( this.baseUrl + 'metals/metalshap');
  }

  getMetalApi() {
    return this.http.get<IMetal>('https://metals-api.com/api/latest?access_key=r3rj96h3261f967i8f26656pffjvuk90l94runa5hw9jrh25nlfkc6s99ow0&base=USD&symbols=XAU,XAG,XPD,XPT,XRH');
  }

  getItems(): Observable<IMetal> {
    
    var metalData = '{"success":true,"timestamp":1637419620,"date":"2021-12-18","base":"USD","rates":{"USD":1,"XAG":0.04064343864,"XAU":0.00054209756,"XPD":0.00050180040120361,"XPT":0.00097456669912366,"XRH":6.971149825784e-5},"unit":"per ounce"}';
    let metal:IMetal = JSON.parse(metalData);

    return of(metal);
  } 

  getPlanTypeListAsync() {
    return this.http.get<IPlanType[]>( this.baseUrl + 'plans/planType');
  }

  getUserPlanListAsync() {
    return this.http.get<IUserPlans>( this.baseUrl + 'plans/UserPlansInfo');
  }

  getPlanOrdersAsync(id) {
    return this.http.get<IPlanOrder>(this.baseUrl + 'plans/PlanOrder/' + id)
  }

  submitNewPlan(values: INewPlan) {
    console.log(values);
    return this.http.post<INewPlan>(this.baseUrl + 'plans/NewPlan' , values);
  }

  submitOrderPlan(values: INewPlan){
    console.log(values);
    return this.http.post<INewPlan>(this.baseUrl + 'plans/NewOrderPlan' , values);
  }
  
}
