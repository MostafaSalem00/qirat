import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import decode from 'jwt-decode';
import { map } from 'rxjs/operators';
import { Role } from 'src/app/shared/models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(private accountService: AccountService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {
    // this will be passed from the route config
    // on the data property
    // const expectedRole = route.data.expectedRole;
    // const token = localStorage.getItem('token');
    // // decode the token to get its payload
    // const tokenPayload = decode(token);
    // // if (
    // //   !this.auth.isAuthenticated() || 
    // //   tokenPayload.role !== expectedRole
    // // ) {
    // //   this.router.navigate(['login']);
    // //   return false;
    // // }
    // // return true;
    // console.log(tokenPayload);
    return this.accountService.currentUser$.pipe(
      map(auth => {
        // auth.role == tokenPayload.role
        //console.log(auth);
        if(auth){
          const roleArray = auth.role.map(value => value.toLowerCase());
          //console.log(roleArray);
          if(roleArray.includes(Role.OWNER.toLowerCase()) || roleArray.includes(Role.ADMIN.toLowerCase()))
            return true;
        }
        this.router.navigate(['admin/login'], {queryParams: {returnUrl: state.url}});
      })
    );
  }
  
}
