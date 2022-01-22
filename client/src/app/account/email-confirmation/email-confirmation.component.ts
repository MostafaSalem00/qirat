import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {

  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;

  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.confirmEmail();
  }

  confirmEmail(){
    this.showError = this.showSuccess = false;
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];

    console.log(token);
    console.log(email);

    
    if(token === undefined || email === undefined)
      this.router.navigateByUrl('/home')

    //debugger;
    this.accountService.confirmEmail(token,email).subscribe((data) => {
      console.log(data);
      this.showSuccess = true;
    },error => {
      console.log(error);
      this.showError = true;
      this.errorMessage = error.error.message;
    })
  }

}
