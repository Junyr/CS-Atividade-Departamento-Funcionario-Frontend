import { Component, OnInit } from '@angular/core';
import { Button } from "primeng/button";
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Button, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  email: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.email$.subscribe(email => {
      this.email = email;
    });
  }

  sair() { this.authService.logout(); }

  getIsAuthorized(): boolean { return this.authService.getIsAuthorized(); }

}
