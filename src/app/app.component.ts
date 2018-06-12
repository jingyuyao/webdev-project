import { Component, OnInit, AfterViewInit } from '@angular/core';

import { IdentityService, Identity } from './services/identity.service';
import { PingService } from './services/ping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  currentIdentity: Identity;

  constructor(
    private identityService: IdentityService,
    private pingService: PingService,
  ) { }

  ngOnInit() {
    this.identityService
      .getCurrentIdentity()
      .subscribe(identity => this.currentIdentity = identity);

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
}
