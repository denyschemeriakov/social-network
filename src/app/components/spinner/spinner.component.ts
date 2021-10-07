import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  get isLoading(): boolean {
    return this._dataService.isLoading;
  }

  constructor(private readonly _dataService: DataService) { }

  ngOnInit(): void {
  }

}
