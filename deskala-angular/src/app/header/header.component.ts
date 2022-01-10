import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  onLogout = () => {
    this.authService.logoutUser().subscribe(
      (res) => {
        this.authService.deleteToken();
        this.router.navigateByUrl('/');
      },
      (err) => {
        alert('Error Logging Out');
      }
    );
  };
}
