import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { ɵangular_packages_router_router_b } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {
  passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]/;
  error = '';
  successMessage = '';
  submitted = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  onFormSubmit(form: NgForm) {
    this.submitted = true;
    if (!form.form.valid) return;
    this.authService.registerUser(form.value).subscribe(
      (res) => {
        console.log(res);
        this.successMessage = res['message'];
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
}
