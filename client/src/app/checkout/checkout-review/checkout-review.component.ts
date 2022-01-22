import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IPlanSummary } from 'src/app/shared/models/planSummary';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit {

  @Input() currentPlan : IPlanSummary;
  @Input() passedSubTotal : number;
  @Input() passedMetalName: string;
  
  constructor(private checkoutService: CheckoutService , private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.passedSubTotal);
  }

  createPaymentIntent(){
    
    return this.checkoutService.createPaymentIntent(this.currentPlan).subscribe((response:any) => {
      console.log(response);
      this.toastr.success('Payment Intent created');
    }, error => {
      console.log(error);
      this.toastr.error(error);
    });
  }

}
