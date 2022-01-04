import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { Routes } from '@angular/router';

const routes : Routes = [
  {path: '' , component: ShopComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  // exports: [ShopComponent]
})
export class ShopRoutingModule { }
