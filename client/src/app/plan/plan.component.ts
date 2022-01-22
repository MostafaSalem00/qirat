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
  // dd: any[];
  //metalTypes: any [];

  constructor(private fb: FormBuilder, private router: Router ,private planService : PlanService ) { }

  ngOnInit(): void {
    this.createPlanForm();
    this.getPlanTypeList();
    this.getMetalList();
  }

  createPlanForm() {
    this.planForm = this.fb.group({
      planTypeId : ['' , Validators.required],
      metalTypeId: ['' , Validators.required],
      metalTypeName : [null],
      amount: [null , Validators.required],
      measurementType: [null, Validators.required],
      // metalPrice:[null, Validators.required],
      acceptTerms: [false, Validators.requiredTrue],        
      //metals : [null]
    });
    //this.setupRecalculation();
  }

  getMetalList() {
    this.planService.getMetalTypesAsync().subscribe(response => {
      console.log(response);
      this.metalTypes = response;
      console.log(this.metalTypes);
    }, error => {
      console.log(error);
    });
  }  

  getPlanTypeList() {
    this.planService.getPlanTypeListAsync().subscribe(response =>{
      console.log(response);
      this.planTypes = response;
    }, error => {
      console.log(error);
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

    var metalName = this.metalTypes.find(s => s.alternativeId == e.value).name;
    console.log(metalName)

    this.planForm.patchValue({
      metalTypeName: metalName
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
