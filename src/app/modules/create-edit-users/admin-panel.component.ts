import {Component, OnInit} from '@angular/core';
import {IUser} from "../../models";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  public users: IUser[];
  public userToDelete: IUser;
  public isLoading: boolean = true;

  constructor(private readonly _dataService: DataService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public deleteUser(): void {
    this.isLoading = this._dataService.isLoading = true;
    this._dataService.deleteUser(this.userToDelete.id).subscribe(() => {
      this.getUsers();
    })
  }

  public getUsers(): void {
    this.isLoading = this._dataService.isLoading = true;
    this._dataService.getUsers().subscribe((res) => {
      this.users = res;
      this.isLoading = this._dataService.isLoading = false;
    })
  }
}
