import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  get isAuthorized(): boolean {
    return this._authService.isAuthorized;
  }

  constructor(private readonly _router: Router,
              private location: Location,
              private readonly _authService: AuthService) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this._authService.isAuthorized = false;
    this._authService.isAdmin = false;
    this._router.navigate(['/login']);
  }

  public goBack(): void {
    this.location.back();
  }
}
