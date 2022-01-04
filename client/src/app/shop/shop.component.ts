import { Component, OnInit } from '@angular/core';
import { IMetal } from '../shared/models/metal';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  metals: IMetal;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getMetals().subscribe(response =>{
      this.metals = response;
    }, error => {
      console.log(error);
    })
  }

}
