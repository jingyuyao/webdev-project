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
      .currentUser()
      .subscribe(user => {
        this.user = user;
        if (user == null) {
          this.router.navigate(['/']);
        }
      });
  }

  userDebug(): string {
    return JSON.stringify(this.user);
  }

  logOut() {
    this.identityService.logOut();
  }
}
