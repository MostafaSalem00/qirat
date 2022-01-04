import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { Role } from 'src/app/shared/models/Role';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  currentUser$: Observable<IUser>;
  isAdmin$: Observable<boolean>;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$
    //this.isAdmin();
    this.isAdmin$ = this.accountService.isAdmin();
  }

  logOut() {
    this.accountService.logout();
  }

  isAdmin(){
    // this.currentUser$.subscribe((data) => {
    //   console.log(data);
    // });
    return this.currentUser$.pipe(
      
      map(auth => {
        console.log(auth);
        if(auth){
          const roleArray = auth.role.map(value => value.toLowerCase());
          //console.log(roleArray);
          if(roleArray.includes(Role.OWNER.toLowerCase()) || roleArray.includes(Role.ADMIN.toLowerCase()))
            return true;
        }
        
        return false;
      })
    );
  }

}
