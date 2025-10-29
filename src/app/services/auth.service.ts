import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  TOKEN_KEY: string = "token";

  login(email: string){
    const token = email;
    localStorage.setItem(this.TOKEN_KEY, token);
    this.router.navigate(['/funcionarios']);
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getIsAuthorized(): boolean{
    return localStorage.getItem(this.TOKEN_KEY) ? true : false;
  }

}
