import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { User, Role } from '../models/user.model';
import { UserService } from '../services/user.service';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: User;
  userForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private identityService: IdentityService,
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['NONE'],
    });

    this.route.data.subscribe(data => {
      this.user = data.user;
      this.userForm.setValue({
        name: this.user.name,
        email: this.user.email,
        role: this.user.roles.includes(Role.ADMIN) ? 'ADMIN' : 'NONE',
      });
    });
  }

  updateUser() {
    this.snackBar.open('Updating profile...');
    const formValue = this.userForm.value;
    const updatedUser = {
      ...this.user,
      name: formValue.name,
      email: formValue.email,
      // A bit hacky but it works.
      roles: formValue.role === 'ADMIN' ? [Role.ADMIN] : [],
    };
    this.userService.updateProfile(updatedUser).subscribe(
      () => this.snackBar.open('Profile updated', '', {duration: 1000}),
      () => this.snackBar.open(
        'Unable to update deck', '', {duration: 1000}),
    );
  }

  logOut() {
    this.identityService.logOut();
    this.router.navigate(['/']);
  }
}
