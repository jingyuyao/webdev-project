import { Component, OnInit } from '@angular/core';

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
    private identityService: IdentityService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService
      .currentUser()
      .subscribe(user => this.user = user);
  }

  userDebug(): string {
    return JSON.stringify(this.user);
  }

  logOut() {
    this.identityService.logOut();
  }
}
