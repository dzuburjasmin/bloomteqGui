import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {

   }
   register(model: any): Observable<any> {
    return this.http.post(`${baseUrl}/api/Token/register`, model);
  }

  login(model: any): Observable<any> {
    return this.http.post(`${baseUrl}/api/Token/login`, model);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }
  startLogin(){
    this.router.navigate(['login']);
  }
  logout(){
    localStorage.setItem("token","")
    this.router.navigate(["login"]);
  }
  getUserName() : string{
    var decoded_token = this.jwtHelper.decodeToken(this.retrieveFromStorage("token"));
    return decoded_token.sub;
  }
  getToken() : string{
    return this.retrieveFromStorage("token");
  }
  private retrieveFromStorage(key: string): any {
    var item = localStorage.getItem(key);
    if (item && item !== 'undefined') {
        return item;
    }
    return null;
}
}
