import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {IUser} from "../../models";
import {AuthService} from "../../services/auth.service";
import {CompleterItem} from "ng2-completer";

@Component({
  selector: 'app-overview-users',
  templateUrl: './overview-users.component.html',
  styleUrls: ['./overview-users.component.scss']
})
export class OverviewUsersComponent implements OnInit {

  public users: IUser[];
  public usernames: string[] = [];
  public authorizeUsername: string;
  public isLoading: boolean = true;

  private _users: IUser[];

  constructor(private readonly _authService: AuthService,
              private readonly _dataService: DataService) { }

  ngOnInit(): void {
    this.authorizeUsername = this._authService.authorizeUsername;

    this.isLoading = this._dataService.isLoading = true;
    this._dataService.getUsers().subscribe((res) => {
      this.users = this._users = res;
      this.users.forEach((user) => {
        this.usernames.push(user.username);
      })
      this.isLoading = this._dataService.isLoading = false;
    })
  }

  public onSelectUser($event: CompleterItem): void {
    if ($event && $event.title) {
      this.users = this.users.filter((user) => user.username === $event.title);
      return;
    }
    this.users = [...this._users];
  }
}
