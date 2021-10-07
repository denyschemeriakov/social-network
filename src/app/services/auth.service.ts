import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser, ILoginForm, ROLE} from "../models";
import {Observable} from "rxjs";
import {LOGIN_URL} from "../shared/endpoints";
import {delay, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAdmin: boolean = false;
  public isAuthorized: boolean = false;
  public authorizeUsername: string;

  constructor(private readonly _http: HttpClient) { }

  public login(loginForm: ILoginForm): Observable<IUser[]> {
    const {username, password} = loginForm;
    return this._http.get<IUser[]>(`${LOGIN_URL}?username=${username}&password=${password}`).pipe(
      delay(500),
      map((res) => {
        if (res.length) {
          this.isAdmin = res[0].role === ROLE.ADMIN;
          this.isAuthorized = true;
          this.authorizeUsername = res[0].username;
        }
        return res;
      }),
    );
  }
}
