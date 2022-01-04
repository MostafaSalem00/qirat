import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetalEnum } from 'src/app/shared/models/metalenum';
import { IPlanOrder } from 'src/app/shared/models/planOrder';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css']
})
export class PlanDetailsComponent implements OnInit {

  plandId : string;
  planOrders: IPlanOrder;
  metalName: string;
  constructor(private http: HttpClient,private activatedRoute: ActivatedRoute, private planService: PlanService) { }

  ngOnInit(): void {
    this.plandId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPlanItemsOrder();
    //this.shapeMetal();
  }

  getPlanItemsOrder(){
    this.planService.getPlanOrdersAsync(this.plandId).subscribe(response => {
        console.log(response);
        this.planOrders = response;
        console.log(this.planOrders);
        this.shapeMetal();
        console.log(this.metalName);
    }, error => {
      console.log(error);
    });
  }

  shapeMetal() {
    
    var _metalName = this.planOrders.plan.orderItems[0].metalTypeName;

    var mapedName = '';
    Object.entries(MetalEnum).map(function(key,index) {
      if(key[0] == _metalName){
        mapedName = key[1];
      }      
    });
    this.metalName = mapedName;
  }
  

  
}
