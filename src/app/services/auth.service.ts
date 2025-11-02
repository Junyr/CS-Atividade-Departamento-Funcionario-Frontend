import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  TOKEN_KEY: string = "token";

  private emailSubject = new BehaviorSubject<string>(localStorage.getItem(this.TOKEN_KEY) || '');

  email$ = this.emailSubject.asObservable();

  login(email: string){
    const token = email;
    localStorage.setItem(this.TOKEN_KEY, token);
    this.emailSubject.next(email);
    this.router.navigate(['/funcionarios']);
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
    this.emailSubject.next('');
    this.router.navigate(['/login']);
  }

  getIsAuthorized(): boolean{
    return localStorage.getItem(this.TOKEN_KEY) ? true : false;
  }

}
