import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMetal } from 'src/app/shared/models/metal';
import { MetalEnum } from 'src/app/shared/models/metalenum';
import { MetalMeasurement } from 'src/app/shared/models/metalmeasurement';
import { IMetalType } from 'src/app/shared/models/metalType';
import { IOrderItem } from 'src/app/shared/models/orderItem';
import { IPlanOrder } from 'src/app/shared/models/planOrder';
import { IPlanType } from 'src/app/shared/models/planType';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-plan-order',
  templateUrl: './plan-order.component.html',
  styleUrls: ['./plan-order.component.css']
})
export class PlanOrderComponent implements OnInit {

  disabledAll : boolean;
  planForm : FormGroup;
  planOrders: IPlanOrder;
  plandId : string;
  orderId: string;
  currentOrder : IOrderItem;
  planTypes: IPlanType[];
  metalTypes: IMetalType[];
  metalApiModel: IMetal;
  dd: any[];
  
  constructor(private fb: FormBuilder, private planService : PlanService, private router: Router ,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.disabledAll = true;
    this.plandId = this.activatedRoute.snapshot.paramMap.get('id');
    this.orderId = this.activatedRoute.snapshot.paramMap.get('order');
    this.createPlanForm();

    this.getPlanItemsOrder();

    this.getPlanTypeList();
    this.callMetlApi();

    
    
  }

  createPlanForm() {
    this.planForm = this.fb.group({
      id:[null, Validators.required],
      planTypeId : ['', Validators.required],
      metalTypeId: ['' , Validators.required],
      metalTypeName : [null],
      amount: [null , Validators.required],
      measurementType: [null, Validators.required],
      metalPrice:[null, Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      totalPrice: [null],
      metals : [null]
    });
    //this.setupRecalculation();
}

getPlanItemsOrder(){
  this.planService.getPlanOrdersAsync(this.plandId).subscribe(response => {      
      this.planOrders = response;
      // console.log(this.planOrders);
      // console.log(this.planOrders.plan.orderItems[Number(this.orderId) - 1].id);
      // console.log(this.planOrders.plan.orderItems[Number(this.orderId) - 1]);
      
      //this.currentOrder = this.planOrders.plan.orderItems[Number(this.orderId)].id != 0 ? this.planOrders.plan.orderItems[Number(this.orderId) - 1]  : this.planOrders.plan.orderItems[Number(0)] ;
      console.log(this.planOrders);
      console.log(this.currentOrder);
      this.updatePlanForm();
  }, error => {
    console.log(error);
  });
}

updatePlanForm() {

  
  this.planForm.controls['id'].setValue(this.plandId, {
    onlySelf: true
  });

  var OrderObjectWithHighestAmount = this.planOrders.plan.orderItems.reduce(function(max, x) {
    return x.quantity > max.quantity ? x : max;
  })
    console.log(OrderObjectWithHighestAmount);

  this.currentOrder = OrderObjectWithHighestAmount;

  this.planForm.controls['planTypeId'].setValue(this.planOrders.plan.planTypeId, {
    onlySelf: true
  });
  

  this.planForm.controls['metalTypeId'].setValue(this.currentOrder.metalTypeId, {
    onlySelf: true
  });

  this.planForm.controls['metalTypeName'].setValue(this.dd[this.currentOrder.metalTypeId-1].Name, {
    onlySelf: true
  });

  var metalPrice = this.dd.find(s => s.Index == this.currentOrder.metalTypeId).Value;

  this.planForm.controls['metalPrice'].setValue(metalPrice, {
    onlySelf: true
  });

  console.log(this.dd);

  this.planForm.controls['measurementType'].setValue(this.currentOrder.measurementType, {
    onlySelf: true
  });
  this.planForm.controls['amount'].setValue(this.currentOrder.quantity, {
    onlySelf: true
  });

  this.planForm.get('amount').setValidators([Validators.required, Validators.min(this.currentOrder.quantity)]);
  

  this.planForm.controls['totalPrice'].setValue(this.currentOrder.totalPrice, {
    onlySelf: true
  });
  

  
  console.log(this.planForm.controls['metalTypeName'].value);
  
    
  this.setupRecalculation();
}

setupRecalculation() {
  this.planForm.valueChanges.subscribe(value => {    

      console.log(value)
    if(value.metalTypeId !== '' && value.amount !== '' && value.measurementType !== ''){
      if(this.planForm.get('metalTypeId').value === ''){
        console.log('Empty value');
      }    
      
          console.log(value.metalTypeId);
          console.log(value.amount);
          console.log(value.measurementType);

          // step 0 = if measurement type in bar ( *0.32 )
          if(value.amount < 0)
            return;
          var step0 = value.measurementType == MetalMeasurement.Bar ? value.amount * 0.32 : value.amount ;

          console.log(step0);
          // step 1 = metal price * amount 
          var step1 = this.dd.find(s => s.Index == value.metalTypeId).Value * step0;

          // step 2 => get the follwong first ( account fees = 1% from step 1 ) ( Custody fees = 2% from step 1)
          
          var accountFees = step1 * 0.01 ;
          var custodyFees = step1 * 0.02;

          // step 3 = sum  step1 + account fees + Custody fees 
          var step3 = step1 + accountFees + custodyFees ;

          // step 3 = transaction processing fees = 2.9% from step 3 
          var step4 = step3 * 0.029 ;

          var step5 = step3 + step4 + 0.30;

          
          this.planForm.controls.totalPrice.patchValue(step5, {emitEvent: false});
          console.log(this.planForm.controls.totalPrice.value);
    }
    if(value.amount == null || value.measurementType == null){
      this.planForm.controls.totalPrice.patchValue('', {emitEvent: false});
    }
  });
}

getPlanTypeList() {
  this.planService.getPlanTypeListAsync().subscribe(response =>{
    
    this.planTypes = response;
  }, error => {
    console.log(error);
  });
}

callMetlApi(){
  this.planService.getItems().subscribe(response => {
    
    this.metalApiModel = response;
    this.planForm.patchValue({metals:this.metalApiModel});
    this.shapingMetalTypes();      
  }, error => {
    console.log(error);
  });
}

shapingMetalTypes(){
   
  var obj : any[] = [];
  Object.entries(this.metalApiModel.rates).map(function(key,index){

      if( key[0] == "USD" ||  key[0] == "XRH")
      return;
      
      Object.entries(MetalEnum).map(function(key2) {
        if(key2[0] == key[0]){
          //console.log(key);
          //console.log(key2);
          obj.push({'Index': index, 'Name' : key[0] , 'Value' : key[1], 'Title' : key2[1]});
        }
      });
    });
   
  this.dd =obj;
  //console.log(this.dd);
}


changePlanType(e) {
  console.log(e)
  console.log(e.value)
  // this.planForm.controls['planTypeId'].setValue(e.value, {
  //   onlySelf: true
  // });
}

changeMetalType(e) {
  console.log(e)
  console.log(e.value)
  this.planForm.controls['metalTypeId'].setValue(e.value, {
    onlySelf: true
  });

  this.planForm.controls['metalTypeName'].setValue(this.dd[e.value - 1].Name, {
    onlySelf: true
  });

  console.log(this.planForm.controls['metalTypeName'].value);
  var metalPrice = this.dd.find(s => s.Index == e.value).Value;

  this.planForm.controls['metalPrice'].setValue(metalPrice, {
    onlySelf: true
  });
}

onSubmitOrder() {
   
  // this.planForm.patchValue({metalTypeId:1});
  console.log(this.planForm.value);
  
  this.planService.submitOrderPlan(this.planForm.value).subscribe(response => {
    this.router.navigateByUrl('/plan-summary/' + this.plandId );
    // console.log(response);
  }, error => {
    console.log('error');
  })
}

}
