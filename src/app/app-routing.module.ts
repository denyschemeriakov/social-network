import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {IsAuthorizedGuard} from "./guards/is-authorized.guard";
import {IsAdminGuard} from "./guards/is-admin.guard";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    canActivate: [IsAuthorizedGuard],
    path: 'list-users',
    loadChildren: () => import('./modules/overview-users/overview-users.module').then((m) => m.OverviewUsersModule),
  },
  {
    canActivate: [IsAuthorizedGuard, IsAdminGuard],
    path: 'admin-panel',
    loadChildren: () => import('./modules/create-edit-users/admin-panel.module').then((m) => m.AdminPanelModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
