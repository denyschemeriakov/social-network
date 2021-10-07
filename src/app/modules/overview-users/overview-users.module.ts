import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewUsersComponent} from './overview-users.component';
import {OverviewUsersRoutingModule} from "./overview-users-routing.module";
import {DetailComponent} from './detail/detail.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {Ng2CompleterModule} from "ng2-completer";

@NgModule({
  declarations: [
    OverviewUsersComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OverviewUsersRoutingModule,
    SharedModule,
    Ng2CompleterModule
  ]
})
export class OverviewUsersModule {}
