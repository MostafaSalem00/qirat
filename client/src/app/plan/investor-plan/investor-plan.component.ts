import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IPlan } from 'src/app/shared/models/plan';

@Component({
  selector: 'app-investor-plan',
  templateUrl: './investor-plan.component.html',
  styleUrls: ['./investor-plan.component.css']
})
export class InvestorPlanComponent implements OnInit , OnChanges {

  @Input() plan: IPlan;
  @Input() metalName: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // for (let property in changes) {
    //   console.log(property);
    //   if (property === 'count') {
    //     console.log('Previous:', changes[property].previousValue);
    //     console.log('Current:', changes[property].currentValue);
    //     console.log('firstChange:', changes[property].firstChange);
    //   } 
    // }
  }

  ngOnInit(): void {
  }

}
