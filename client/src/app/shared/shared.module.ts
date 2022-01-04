import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  BsDropdownModule, CarouselModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { LightboxModule } from 'ngx-lightbox';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { InputImageComponent } from './components/input-image/input-image.component';

@NgModule({
  declarations: [
    TextInputComponent,
    InputImageComponent
  ],
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    LightboxModule,
    AccordionModule.forRoot(),
  ],
  exports: [
    CarouselModule,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    InputImageComponent,
    BsDatepickerModule,
    LightboxModule,
    AccordionModule
  ]
})
export class SharedModule { }
