import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, interval, Observable, ReplaySubject, Subscription } from 'rxjs';
import { flatMap, startWith, switchMap, tap } from 'rxjs/operators';
import { IMetal } from 'src/app/shared/models/metal';
import { MetalEnum } from 'src/app/shared/models/metalenum';
import { IPlan } from 'src/app/shared/models/plan';
import { IPlanOrder } from 'src/app/shared/models/planOrder';
import { IPlanSummary } from 'src/app/shared/models/planSummary';
import { MetalApiService } from 'src/app/shared/services/metal-api.service';
import { PlanService } from '../plan/plan.service';
import { CheckoutService } from './checkout.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit , OnDestroy {
  plandId : string;
  plan: IPlanSummary;
  calcualtedPrice: number;
  selectedMetalObj: any;
  recentMetalList$: Observable<any[]>;
  recentMetal$: Observable<IMetal>;
  
  constructor(private activatedRoute: ActivatedRoute, private planService: PlanService , private metalApiService: MetalApiService) { }
  
   async ngOnInit() {
    this.plandId = this.activatedRoute.snapshot.paramMap.get('id');

    //this.callAll();
    
    await this.getPlanSummaryById();
   
    await this.metalApiService.fetchMetalEveryXSecond();
    this.assignValuesForBinding();
  }
 
  async getPlanSummaryById(){
    console.log('Plan summary start ')
    this.plan = await this.planService.getPlanSummaryById(this.plandId).toPromise(); 
    console.log(this.plan)
  }

  assignValuesForBinding(){
    console.log('new');
    this.recentMetal$ = this.metalApiService.actualMetalSource$;
    this.recentMetalList$ = this.metalApiService.currentMetalList$.pipe(
      tap(data => {
        //alert(data)
        console.log(data);
        this.selectedMetalObj = data.find(s => s.Index == this.plan?.orderItem?.metalTypeId);        
        this.orderPriceAfterMetalUpdate();
    }));
    // this.selectedMetalObj = this.metalApiService.getMetalTypeObjectById(this.plan?.orderItem?.metalTypeId);
    // console.log(this.selectedMetalObj);
    //console.log(this.metalApiService.getValue(this.recentMetalList$));
    this.metalApiService.getValue(this.recentMetalList$);
  } 

  orderPriceAfterMetalUpdate(){
    console.log('price update');

    if(this.selectedMetalObj == null)
      return;

    // get the actual price for Selected Metal
    var step1 = (1 / this.selectedMetalObj.Value) * this.plan.orderItem.quantity;


    // step 2 => get the follwong first ( account fees = 1% from step 1 ) ( Custody fees = 2% from step 1)
    
    var accountFees = step1 * 0.01 ;
    var custodyFees = step1 * 0.02;

    // step 3 = sum  step1 + account fees + Custody fees 
    var step3 = step1 + accountFees + custodyFees ;


    // step 3 = transaction processing fees = 2.9% from step 3 
    var step4 = step3 * 0.029 ;

    var step5 = step3 + step4 + 0.30;
    
    this.plan.orderItem.totalPrice = step5;
    
    this.calcualtedPrice = step5;
    //alert(step5)
  }

  ngOnDestroy(): void {
    this.metalApiService.subscription.unsubscribe();
  }

  
}
