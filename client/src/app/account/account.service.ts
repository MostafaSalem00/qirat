import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CustomEncoderService } from '../core/services/custom-encoder.service';
import { IKnowAboutUs } from '../shared/models/IKnowAboutUs';
import { Role } from '../shared/models/Role';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;

  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // getCurrentUserValue() {
  //   return this.currentUserSource.value;
  // }

  loadCurrentUser(token: string) {
    
    if(token == null){
      //console.log(token);
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account' , {headers}).pipe(      
      map((user: IUser) => {
        
        if(user) {
          //console.log(user);
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  login(values: any){
    
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        console.log(user);
        if(user){
          console.log(user);
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      } )
    );
  }

  isAdmin(){
    return this.currentUser$.pipe(
      
      map(auth => {
        //console.log(auth);
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

  register(values: any) {
    console.log(values);

    

    return this.http.post(this.baseUrl + 'account/register' , values ).pipe(
      map((user: IUser) => {
        console.log(user);
        localStorage.setItem('token', user.token);
        //this.currentUserSource.next(user);
      })
    );
  }

  registerForm(formdata: FormData) {
   
    return this.http.post(this.baseUrl + 'account/register' , formdata ).pipe(
      map((user: IUser) => {
        console.log(user);
        //localStorage.setItem('token', user.token);
        //this.currentUserSource.next(user);
      })
    );
  }

  confirmEmail(token: string, email: string){
    // let params = new HttpParams({ encoder: new CustomEncoderService() })
    let params = new HttpParams()
    params = params.append('token', token);
    params = params.append('email', email);
    
    return this.http.get(this.baseUrl + 'account/emailconfirmation', { params: params } );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }

  checkUserNameExists(userName: string) {
    // console.log(this.baseUrl);
    // console.log(userName);
    return this.http.get(this.baseUrl + 'account/usernameexists?userName=' + userName);
  }

  getAboutUsData() {
    return this.http.get<IKnowAboutUs[]>(this.baseUrl + 'account/knowaboutus');
  }
}
