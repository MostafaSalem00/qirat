import { Component, Input, OnInit } from '@angular/core';
import { IPlanOrder } from 'src/app/shared/models/planOrder';

@Component({
  selector: 'app-loyality-plan',
  templateUrl: './loyality-plan.component.html',
  styleUrls: ['./loyality-plan.component.css']
})
export class LoyalityPlanComponent implements OnInit {

  @Input() planOrder: IPlanOrder;
  
  constructor() { }

  ngOnInit(): void {
  }

}
