import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IKnowAboutUs } from 'src/app/shared/models/IKnowAboutUs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAboutUsData() {
    return this.http.get<IKnowAboutUs[]>(this.baseUrl + 'account/knowaboutus');
  }
  
  acceptUser(values: any){
    return this.http.post(this.baseUrl + 'admin/member/acceptUser', values);
  }

  rejectUser(values: any){
    return this.http.post(this.baseUrl + 'admin/member/rejectUser', values);
  }
}
