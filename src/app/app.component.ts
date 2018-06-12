import { Component, OnInit, AfterViewInit } from '@angular/core';

import { User } from './models/user.model';
import { IdentityService } from './services/identity.service';
import { PingService } from './services/ping.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  currentUser: User;

  constructor(
    private identityService: IdentityService,
    private pingService: PingService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.identityService
      .getCurrentIdentity()
      .subscribe(identity => {
        if (identity.signedIn) {
          this.userService
            .logInOrRegister(identity)
            .subscribe(
              user => this.currentUser = user,
              () => this.currentUser = null,
            );
        } else {
          this.userService
            .logOut()
            .subscribe(
              () => this.currentUser = null,
              () => this.currentUser = null,
            );
        }
      });

    this.pingService
      .getPong()
      .subscribe(
        pong => console.log(pong.data),
        error => console.log(error.message),
      );
  }

  ngAfterViewInit() {
    this.identityService.renderSignInButton('google-signin');
  }

  logOut() {
    this.identityService.logOut();
  }

  currentUserDebug(): string {
    return JSON.stringify(this.currentUser);
  }
}
