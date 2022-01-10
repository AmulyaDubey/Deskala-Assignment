import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  error = '';
  submitted = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onFormSubmit(form: NgForm) {
    this.submitted = true;
    if (!form.form.valid) return;
    this.authService.loginUser(form.value).subscribe(
      (res) => {
        this.authService.setToken(res);
        this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        this.error = err.error.error;
      },
      () => {
        form.form.controls['password'].reset();
        this.submitted = false;
      }
    );
  }

  clearError = () => {
    this.error = '';
  };
}
