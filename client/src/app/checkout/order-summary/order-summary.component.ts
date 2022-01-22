import { Component, Input, OnInit } from '@angular/core';
import { IPlanSummary } from 'src/app/shared/models/planSummary';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  @Input() currentPlan : IPlanSummary;
  @Input() metalName: string;
  @Input() subTotal: number;
  @Input() isBasket = true;
  constructor() { }

  ngOnInit(): void {
  }

}
