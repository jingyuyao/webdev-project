import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: User;
  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.route.data.subscribe(data => {
      this.user = data.user;
      this.userForm.setValue({
        name: this.user.name,
        email: this.user.email,
      });
    });
  }

  updateUser() {
    this.snackBar.open('Updating profile...');
    const updatedUser = {
      ...this.user,
      ...this.userForm.value,
    };
    this.userService.updateProfile(updatedUser).subscribe(
      () => this.snackBar.open('Profile updated', '', {duration: 1000}),
      () => this.snackBar.open(
        'Unable to update deck', '', {duration: 1000}),
    );
  }
}
