import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IUser} from "../../../models";
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public user: IUser;
  imgURL: ArrayBuffer
  public isLoading: boolean;

  constructor(private readonly _route: ActivatedRoute,
              private readonly _dataService: DataService) { }

  ngOnInit(): void {
    this.isLoading = this._dataService.isLoading = true;
    const id = parseInt(this._route.snapshot.paramMap.get('id')!, 10);
    this._dataService.getUser(id).subscribe((res) => {
      this.user = res;
      if (res.photo) {
        this.imgURL = res.photo;
      }
      this.isLoading = this._dataService.isLoading = false;
    });
  }

}
