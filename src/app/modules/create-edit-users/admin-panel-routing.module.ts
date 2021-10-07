import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminPanelComponent} from "./admin-panel.component";
import {CreateEditUserComponent} from "./create-edit-user/create-edit-user.component";

const routes: Routes = [
  { path: '', component: AdminPanelComponent},
  { path: 'create-user', component: CreateEditUserComponent },
  { path: 'edit-user/:id', component: CreateEditUserComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule {
}
