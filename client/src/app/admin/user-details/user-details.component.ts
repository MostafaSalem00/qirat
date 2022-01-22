import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AccountService } from 'src/app/account/account.service';
import { IAttachment } from 'src/app/shared/models/attachment';
import { IKnowAboutUs } from 'src/app/shared/models/IKnowAboutUs';
import { IMember } from 'src/app/shared/models/member';
import { UserService } from '../users/user.service';
import { UserDetailsService } from './user-details.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: string;
  userMember: IMember;
  attachmentList: string[];
  bsConfig: Partial<BsDatepickerConfig>;
  userForm : FormGroup;
  aboutUs: IKnowAboutUs[] ;
  attachemntSource : any[]
  
  constructor(private fb: FormBuilder,private userdetailsService: UserDetailsService,private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    

    this.bsConfig = {
      containerClass : 'theme-red',
      dateInputFormat: 'YYYY-MM-DD',
    };
    this.createUserForm();
    this.getAboutUsDropdown();

    this.getUserById();
    
  }

  getUserById(){
    this.userService.loadMemberUserByIdAsync(this.userId).subscribe(response => {
      console.log(response);      
      this.userMember = response;
      this.attachemntSource = response.attachment.map(a => {
        return { src: a.path };
      });
      this.attachmentList = response.attachment.map(a => a.path);
      console.log(this.attachmentList);    
      this.updateUserFormVields();
    }, error => {
      console.log(error);
    });
  }

  createUserForm(){
    this.userForm =  this.fb.group({
      knowAboutUsId : {value: null, disabled: true},
      firstName : {value: null, disabled: true},
      lastName : {value: null, disabled: true},
      dateOfBirth: {value: null, disabled: true},
      userName :{value: null, disabled: true},      
      
      email: {value: null, disabled: true},
      phoneNumber: {value: null, disabled: true},
      otherPhone: {value: null, disabled: true},
      isAmerican: {value: null, disabled: true},
      attachments: {value: null, disabled: true},
      residentAddress : {value: null, disabled: true},
      mailingAddress : {value: null, disabled: true},
      acceptPolicy: {value: null, disabled: true},
    });
  }

  updateUserFormVields() {
    console.log(Number(this.userMember.knowAboutUsId));
    // this.userForm.patchValue({
    //   knowAboutUsId : Number(this.userMember.knowAboutUsId)
    // })
    //this.userForm.setValue(this.userMember);
    this.userForm.setValue({
      knowAboutUsId : Number(this.userMember.knowAboutUsId) ,
      firstName: this.userMember.firstName,
      lastName: this.userMember.lastName,
      dateOfBirth: this.userMember.dateOfBirth,
      userName : this.userMember.userName,
      
      attachments: this.userMember.attachment,
      email:  this.userMember.email,
      phoneNumber: this.userMember.phoneNumber,
      otherPhone: this.userMember.otherPhoneNumber,
      isAmerican: this.userMember.isAmerican,
      residentAddress : this.userMember.residentAddress,
      mailingAddress : this.userMember.mailingAddress,
      acceptPolicy: this.userMember.acceptPolicy,
      
   });
  }

  getAboutUsDropdown() {
    this.userdetailsService.getAboutUsData().subscribe(response => {
      console.log(response);
      this.aboutUs = response;
      console.log(this.aboutUs);
    }, error => {
      console.log(error);
    });
  }

  onSubmit($event: Event) {
    var activeButton = document.activeElement.id;

    if (activeButton == "submit-accept") {
      console.log(this.userForm.value);
      this.userdetailsService.acceptUser(this.userForm.value).subscribe((data) => {

      });
    }
    if (activeButton == "submit-reject") {
      this.userdetailsService.rejectUser(this.userForm).subscribe((data) => {

      });
    }
    // var user = Object.assign({},this.userForm.value);
    // console.log(user);
    // this.accountService.register(user).subscribe(response => {
    //   console.log(response);
    //   //this.router.navigateByUrl('/shop');
    // }, error => {
      
    // });
  }

}
