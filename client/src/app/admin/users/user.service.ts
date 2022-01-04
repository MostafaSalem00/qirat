import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMember } from 'src/app/shared/models/member';
import { IUser } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  loadMemberUsersAsync() {
    return this.http.get<IMember[]>(this.baseUrl + 'admin/member' );
  }

  loadMemberUserByIdAsync(id: string) {
    
    return this.http.get<IMember>(this.baseUrl + 'admin/member/' + id);
  }

  updateMemberByIdAsync() {
    
  }
}
