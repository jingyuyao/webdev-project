import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../models/user.model';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private identityService: IdentityService,
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
  }

  userDebug(): string {
    return JSON.stringify(this.user);
  }

  logOut() {
    this.identityService.logOut();
    this.router.navigate(['/']);
  }
}
