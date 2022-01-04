import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { NavHeaderComponent } from './nav-header/nav-header.component';



@NgModule({
  declarations: [NavBarComponent, SectionHeaderComponent, NavHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BreadcrumbModule,
    SharedModule
  ],
  exports: [NavBarComponent, SectionHeaderComponent,NavHeaderComponent]
})
export class CoreModule { }
