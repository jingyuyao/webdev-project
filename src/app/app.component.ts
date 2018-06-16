import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { IdentityService } from './services/identity.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  loggedIn = false;

  constructor(
    private router: Router,
    private identityService: IdentityService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService
      .currentUser()
      .subscribe(user => this.loggedIn = !!user);
  }

  ngAfterViewInit() {
    this.identityService.renderLogInButton('google-login');
  }

  logOut() {
    this.identityService.logOut();
    this.router.navigate(['/']);
  }
}
