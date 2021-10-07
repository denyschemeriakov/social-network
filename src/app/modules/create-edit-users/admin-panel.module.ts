import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminPanelComponent} from './admin-panel.component';
import {AdminPanelRoutingModule} from "./admin-panel-routing.module";
import {CreateEditUserComponent} from './create-edit-user/create-edit-user.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AdminPanelComponent,
    CreateEditUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminPanelRoutingModule
  ]
})
export class AdminPanelModule { }
