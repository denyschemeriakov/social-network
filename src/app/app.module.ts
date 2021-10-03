import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginModule} from "./components/login/login.module";
import {OverviewUsersModule} from "./modules/overview-users/overview-users.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    OverviewUsersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
