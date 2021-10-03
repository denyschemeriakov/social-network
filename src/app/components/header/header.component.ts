import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private readonly _router: Router) { }

  public ngOnInit(): void {
  }

  public goToLoginPage(): void {
    this._router.navigate(['/login']);
  }

  public goToUsersList(): void {
    this._router.navigate(['/users-list']);
  }
}
