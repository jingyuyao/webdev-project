import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { IdentityService } from './services/identity.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn = false;

  constructor(
    private identityService: IdentityService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService
      .getProfile()
      .subscribe(
        () => this.loggedIn = true,
        () => {
          this.identityService
            .currentIdentity()
            .pipe(first())
            .subscribe(identity => {
              if (identity.loggedIn) {
                this.userService
                  .logInOrRegister(identity)
                  .subscribe(
                    () => this.loggedIn = true,
                    () => this.renderLogInButton(),
                  );
              } else {
                this.renderLogInButton();
              }
            });
        }
      );
  }

  private renderLogInButton() {
    this.identityService.renderLogInButton('google-login');
    this.identityService
      .currentIdentity()
      .pipe(first(identity => identity.loggedIn))
      .subscribe(identity =>
        this.userService
          .logInOrRegister(identity)
          .subscribe(
            () => this.loggedIn = true,
            () => {
              this.identityService
                .logOut()
                .subscribe(() => alert('log in failed'));
            }
          )
      );
  }
}
