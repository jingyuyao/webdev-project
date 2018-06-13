import { Component, OnInit, AfterViewInit } from '@angular/core';

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
}
