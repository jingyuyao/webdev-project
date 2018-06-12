import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IdentityService } from './services/identity.service';
import { PingService } from './services/ping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  currentUser$: Observable<gapi.auth2.GoogleUser>;
  isSignedIn$: Observable<boolean>;

  constructor(
    private identityService: IdentityService,
    private pingService: PingService,
  ) { }

  ngOnInit() {
    this.currentUser$ = this.identityService.currentUser$;
    this.isSignedIn$ = this.identityService.isSignedIn$;

    this.pingService
      .getPong()
      .subscribe(
        pong => console.log(pong.data),
        error => console.log(error.message),
      );
  }

  ngAfterViewInit() {
    this.identityService.render('google-signin');
  }

  logOut() {
    this.identityService.logOut();
  }
}
