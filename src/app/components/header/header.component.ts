import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public currentUrl: string;

  get isAuthorized(): boolean {
    return this._authService.isAuthorized;
  }

  get isAdmin(): boolean {
    return this._authService.isAdmin;
  }

  constructor(private readonly _router: Router,
              private readonly _authService: AuthService) { }

  public ngOnInit(): void {
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
  }

  public goToLoginPage(): void {
    this._router.navigate(['/login']);
  }

  public goToUsersList(): void {
    this._router.navigate(['/list-users']);
  }

  public goToAdminPanel(): void {
    this._router.navigate(['/admin-panel']);
  }
}
