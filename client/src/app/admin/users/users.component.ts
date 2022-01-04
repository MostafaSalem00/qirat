import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/shared/models/member';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: IMember[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.userService.loadMemberUsersAsync().subscribe(response => {
      console.log(response);
      this.users = response;
    }, error => {
      console.log(error);
    });
  }

}
