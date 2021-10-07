import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ShortNamePipe} from "../pipes/short-name.pipe";
import {IsOnlineDirective} from "../directives/isOnline.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ShortNamePipe,
    IsOnlineDirective
  ],
  exports: [
    ShortNamePipe,
    IsOnlineDirective
  ],
})
export class SharedModule { }
