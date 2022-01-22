import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { MyPlansComponent } from './plan/my-plans/my-plans.component';
import { PlanDetailsComponent } from './plan/plan-details/plan-details.component';
import { PlanOrderComponent } from './plan/plan-order/plan-order.component';
import { PlanSummaryComponent } from './plan/plan-summary/plan-summary.component';
import { PlanComponent } from './plan/plan.component';
import { Role } from './shared/models/Role';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {path: '' , component: HomeComponent },
  {path: 'landing' , component: LandingComponent },
  {path: 'shop' , component: ShopComponent  },
  {
    path: 'admin' , 
    canActivate: [RoleGuard],
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule) , 
    // data: { roles: [Role.ADMIN , Role.OWNER , Role.MANAGER]}
  },
  { path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule) , data: {breadcrumb: {skip: true}}},
  {path: 'admin/login' , component: LoginComponent , data: {breadcrumb: 'Admin / Login'}},
  { path: 'plan',   component: PlanComponent , data: {breadcrumb: 'New Plan'} },
  { path: 'my-plans',   component: MyPlansComponent , data: {breadcrumb: 'My Plan'} },
  { path: 'plan-details/:id',   component: PlanDetailsComponent , data: {breadcrumb: 'Details'} },
  { path: 'plan-order/:id', component: PlanOrderComponent , data: {breadcrumb: 'Plan Order'}},
  { path: 'plan-summary/:id', component: PlanSummaryComponent , data: {breadcrumb: 'Order Summary'}},
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then((m) => m.CheckoutModule),
    data: { breadcrumb: 'Checkout' },
  },
  { path: '**' , redirectTo: '' , pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
