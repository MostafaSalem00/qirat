import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IKnowAboutUs } from 'src/app/shared/models/IKnowAboutUs';
import { AccountService } from '../account.service';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DatePipe]
})
export class RegisterComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig>;
  registerForm : FormGroup;
  errors: string[];
  aboutUs: IKnowAboutUs[] ;
  myDateValue: string;
  myKnowAboutIdValue: number;
  images : string[] = [];
  album:any = [];
  files = new Array<File>() ;
  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router , private datePipe: DatePipe, private _lightbox: Lightbox) { }

  ngOnInit(): void {
    this.bsConfig = {
      containerClass : 'theme-red',
      dateInputFormat: 'YYYY-MM-DD',
    };
    this.createRegisterForm();
    this.getAboutUsDropdown();
    this.setIsAmericanValidators();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      
      knowAboutUsId : [0, [Validators.required ]],
      firstName : [null, [Validators.required]],
      lastName : [null, [Validators.required]],
      dateOfBirth: [null , Validators.required],
      userName : [null, {validators:[Validators.required ] , asyncValidators:[this.validateUserNameNotTaken()], updateOn: 'blur'}],
      password : [null, [Validators.required , Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]],
      confirmPassword : [null, [Validators.required , Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]],
      occupation: [null, [Validators.required]],
      email: [null, [Validators.required , Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      phoneNumber: [null, [Validators.required]],
      otherPhoneNumber: [null, [Validators.required]],
      isAmerican: [null, [Validators.required]],
      ssn:[null],
      //w8Passort:[null],
      files: [null],      
      residentAddress : [null, [Validators.required]],
      mailingAddress : [null , [Validators.required]],      
      acceptPolicy: [null, Validators.requiredTrue]
    });
  }//[this.conditionalValidator(() => this.registerForm.get('ssn').value == true, Validators.required)]

  passwordMatchvalidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : "Not Valid";
  }

  validateUserNameNotTaken(): AsyncValidatorFn{    
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if(!control.value){
            return of(null);
          }            
          return this.accountService.checkUserNameExists(control.value).pipe(
            
            map(res => {
              console.log(res);
              return res ? {userNameExists: true} : null;
            })
          );
        })
      );
    }
  }

  setIsAmericanValidators(){
    const ssnControl = this.registerForm.get('ssn');
    const filesControl = this.registerForm.get('files');
    

    this.registerForm.get('isAmerican').valueChanges
      .subscribe(isAmerican => {

        if (isAmerican === true) {
          console.log('isAmerican = true');
          ssnControl.setValidators([Validators.required]);
          filesControl.setValidators(null);          
        }

        if (isAmerican === false) {
          console.log('isAmerican = false');
          ssnControl.setValidators(null);
          //filesControl.setValidators([Validators.required]);
          
        }

        ssnControl.updateValueAndValidity();
        filesControl.updateValueAndValidity();
        
      });  
  }


  getAboutUsDropdown() {
    this.accountService.getAboutUsData().subscribe(response => {
      console.log(response);
      this.aboutUs = response;
      console.log(this.aboutUs);
    }, error => {
      console.log(error);
    });
  }

  changeCity(e) {
    console.log(e)
    console.log(e.value)
    this.myKnowAboutIdValue = e.value;
    
    this.registerForm.controls['knowAboutUsId'].setValue(e.value, {
      onlySelf: true
    });
  }

  

  change(date: Date){
    console.log(date);
    //const stringDate: string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    //console.log(stringDate);
    var tran = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log(tran);
    this.myDateValue = tran;
    //this.registerForm.patchValue({dateOfBirth:tran});
  }

  onImagesSelected(images){
    console.log(images);
    this.files = images;
    console.log(this.files);
    //this.registerForm.patchValue({files:images});
    // console.log(this.registerForm.get('files').value);
  }

  onSubmit() {

    this.registerForm.patchValue({dateOfBirth:this.myDateValue});
    this.registerForm.patchValue({knowAboutUsId:this.myKnowAboutIdValue});
    var user = Object.assign({},this.registerForm.value);
    console.log(user);
   
    const formulario = new FormData();
    const formData = this.registerForm.value;

    for (const file of this.files) {
      formulario.append("files",file);
    }

    Object.keys(formData).forEach((key) => {
      formulario.append(key, formData[key]);
    });

    this.accountService.registerForm(formulario).subscribe(response => {
      console.log(response);
      //this.router.navigateByUrl('/shop');
    }, error => {
      console.log(error)
      console.log(error.error.errors)
      this.errors = error.error.errors;
      console.log(this.errors);
    });
  }
}
