import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {OverviewUsersComponent} from "./overview-users.component";
import {DetailComponent} from "./detail/detail.component";

const routes: Routes = [
  { path: '', component: OverviewUsersComponent},
  { path: 'detail/:id', component: DetailComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewUsersRoutingModule {}
