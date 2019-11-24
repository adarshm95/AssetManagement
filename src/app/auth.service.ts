import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl= 'http://localhost:51575/api';
  formData: Login;

  constructor(private http: HttpClient) { }

  public Login(userInfo:Login): Observable<any>{
    return this.http.get(this.baseUrl+'/Login?uName='+userInfo.u_name+'&pWord='+userInfo.p_word);
  }
  
  public isLoggedIn()
  {
    return localStorage.getItem('ACCESS_TOKEN')!==null;
  }

  public logout()
  {
    localStorage.removeItem('ACCESS_TOKEN');
  }

  public getLoginDet(): Observable<any>{
    return this.http.get(this.baseUrl+'/Login');
  }

}
