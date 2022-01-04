import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanRoutingModule } from './plan-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PlanComponent } from './plan.component';
import { PlanDetailsComponent } from './plan-details/plan-details.component';
import { MyPlansComponent } from './my-plans/my-plans.component';
import { PlanOrderComponent } from './plan-order/plan-order.component';
import { InvestorPlanComponent } from './investor-plan/investor-plan.component';
import { LoyalityPlanComponent } from './loyality-plan/loyality-plan.component';
import { PlanSummaryComponent } from './plan-summary.component';



@NgModule({
  declarations: [    
    PlanComponent, PlanDetailsComponent, MyPlansComponent, PlanOrderComponent, InvestorPlanComponent, LoyalityPlanComponent, PlanSummaryComponent
  ],
  imports: [
    CommonModule,    
    SharedModule
  ]
})
export class PlanModule { }
