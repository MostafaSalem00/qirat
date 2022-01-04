import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IMetalType } from '../shared/models/metalType';
import { IPlanType } from '../shared/models/planType';
import { PlanService } from './plan.service';
import { IMetal } from '../shared/models/metal';
import { MetalEnum } from '../shared/models/metalenum';
import { MetalMeasurement } from '../shared/models/metalmeasurement';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  planForm : FormGroup;
  planTypes: IPlanType[];
  metalTypes: IMetalType[];
  metalApiModel: IMetal;
  dd: any[];
  //metalTypes: any [];

  constructor(private fb: FormBuilder, private router: Router ,private planService : PlanService ) { }

  ngOnInit(): void {
    this.createPlanForm();
    this.getMetalList();
    this.getPlanTypeList();
    this.callMetlApi();
    // this.planForm.valueChanges.subscribe(val =>{
      
    //   // if(val.metalTypeId != 0 && val.amount != null && val.measurementType != null){
    //     console.log(val.metalTypeId);
    //     console.log(val.amount);
    //     console.log(val.measurementType);
    //   // }
    // });
  }

  getMetalList() {
    this.planService.getMetalListAsync().subscribe(response => {
      console.log(response);
      this.metalTypes = response;
    }, error => {
      console.log(error);
    });
  }

  callMetlApi(){
    this.planService.getItems().subscribe(response => {
      console.log(response);
      this.metalApiModel = response;
      this.planForm.patchValue({metals:this.metalApiModel});
      this.shapingMetalTypes();      
    }, error => {
      console.log(error);
    });
  }

  // https://stackoverflow.com/questions/52181220/converting-object-properties-to-array-of-objects
  shapingMetalTypes(){
   
      var obj : any[] = [];
      Object.entries(this.metalApiModel.rates).map(function(key,index){

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
       
      this.dd =obj;
      console.log(this.dd);
  }

  getPlanTypeList() {
    this.planService.getPlanTypeListAsync().subscribe(response =>{
      console.log(response);
      this.planTypes = response;
    }, error => {
      console.log(error);
    });
  }

  createPlanForm() {
      this.planForm = this.fb.group({
        planTypeId : ['' , Validators.required],
        metalTypeId: ['' , Validators.required],
        metalTypeName : [null],
        amount: [null , Validators.required],
        measurementType: [null, Validators.required],
        metalPrice:[null, Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
        totalPrice: [null],
        metals : [null]
      });
      this.setupRecalculation();
  }

  setupRecalculation() {
    this.planForm.valueChanges.subscribe(value => {

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
      }
      if(value.amount == null || value.measurementType == null){
        this.planForm.controls.totalPrice.patchValue('', {emitEvent: false});
      }
    });
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

  onSubmit() {
    
    
    
   
    // this.planForm.patchValue({metalTypeId:1});
    console.log(this.planForm.value);
    
    this.planService.submitNewPlan(this.planForm.value).subscribe(response => {
      // console.log('done');
      // console.log(response);
      this.router.navigateByUrl('/plan-summary/' + response.id );
    }, error => {
      console.log('error');
    })
  }

  

}
