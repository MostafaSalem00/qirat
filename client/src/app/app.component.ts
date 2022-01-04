import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Qirat';
  
  constructor(private accountService: AccountService){}

  ngOnInit( ): void {
    console.log('im calling at app component init() ');
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    
    const token = localStorage.getItem('token');
      this.accountService.loadCurrentUser(token).subscribe(() => {
        console.log('loaded user');
      }, error => {
        console.log(error);
      });

  }
}
