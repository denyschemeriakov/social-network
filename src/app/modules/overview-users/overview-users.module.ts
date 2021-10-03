import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewUsersComponent } from './overview-users.component';
import {OverviewUsersRoutingModule} from "./overview-users-routing.module";

@NgModule({
  declarations: [
    OverviewUsersComponent
  ],
  imports: [
    CommonModule,
    OverviewUsersRoutingModule
  ],
  exports: [
    OverviewUsersComponent
  ]
})
export class OverviewUsersModule {
  constructor() {
    console.log('bla');
  }
}
