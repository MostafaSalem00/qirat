import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private accountService: AccountService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {
      console.log(this.accountService.currentUser$);
    return this.accountService.currentUser$.pipe(
      
      map(auth => {
        console.log(auth);
        if(auth){
          console.log(auth);
          return true;
        }
        console.log(auth);
        this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
      })
    );
  }
  
}
