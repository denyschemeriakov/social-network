import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IUser} from "../models";
import {Observable} from "rxjs";
import {CREATE_USER_URL, DELETE_USER_URL, EDIT_USER_URL, USER_URL, USERS_URL} from "../shared/endpoints";
import {delay, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public isLoading: boolean = false;

  constructor(private readonly _http: HttpClient) { }

  public getUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(USERS_URL).pipe(delay(500));
  }

  public getUser(id: number): Observable<IUser> {
    return this._http.get<IUser[]>(USER_URL + id).pipe(
      delay(500),
      map((res) => res[0])
    );
  }

  public deleteUser(id: number): Observable<{}> {
    return this._http.delete<{}>(DELETE_USER_URL + id).pipe(
      delay(500),
    );
  }

  public createUser(user: IUser): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(CREATE_USER_URL, user, {headers});
  }

  public editUser(user: IUser, id: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put<any>(EDIT_USER_URL + id, user, {headers});
  }
}
