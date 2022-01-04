import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPlanInfo } from 'src/app/shared/models/planInfo';
import { IUserPlans } from 'src/app/shared/models/userPlans';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.css']
})
export class MyPlansComponent implements OnInit {

  isFirstOpen = true;
  userPlans : IUserPlans;

  constructor(private http: HttpClient, private planService: PlanService) { }

  ngOnInit(): void {
    this.getUserPlanList();
  }

  getUserPlanList() {
    this.planService.getUserPlanListAsync().subscribe(response => {
      //console.log(response);
      this.userPlans = response;
      console.log(this.userPlans);
    }, error => {
      console.log(error);
    })
  }
}
