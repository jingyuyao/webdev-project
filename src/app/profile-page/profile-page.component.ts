import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { IdentityService } from '../services/identity.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: User;

  constructor(
    private router: Router,
    private identityService: IdentityService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService
      .getProfile()
      .subscribe(
        user => this.user = user,
        () => alert('unable to load profile!'),
      );
  }

  userDebug(): string {
    return JSON.stringify(this.user);
  }

  logOut() {
    this.identityService
      .logOut()
      .subscribe(
        () => {
          this.userService
            .logOut()
            .subscribe(
              () => this.router.navigate(['/']),
              () => alert('log out failed'),
            );
        },
        () => alert('log out failed'),
      );
  }
}
