import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule, CarouselModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { LightboxModule } from 'ngx-lightbox';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { InputImageComponent } from './components/input-image/input-image.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';

@NgModule({
  declarations: [
    TextInputComponent,
    InputImageComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    LightboxModule,
    AccordionModule.forRoot(),
    CdkStepperModule
  ],
  exports: [
    CarouselModule,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    StepperComponent,
    InputImageComponent,
    BsDatepickerModule,
    LightboxModule,
    AccordionModule,
    CdkStepperModule,
    StepperComponent
  ]
})
export class SharedModule { }
