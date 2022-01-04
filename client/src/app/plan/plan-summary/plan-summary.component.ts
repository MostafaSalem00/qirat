import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlan } from 'src/app/shared/models/plan';
import { IPlanOrder } from 'src/app/shared/models/planOrder';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-plan-summary',
  templateUrl: './plan-summary.component.html',
  styleUrls: ['./plan-summary.component.css']
})
export class PlanSummaryComponent implements OnInit {

  plandId : string;
  plan: IPlan;
  metalName: string;
  
  constructor(private activatedRoute: ActivatedRoute, private planService: PlanService) { }

  ngOnInit(): void {
    this.plandId = this.activatedRoute.snapshot.paramMap.get('id');

  }

}
