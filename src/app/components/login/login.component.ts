import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isLoading: boolean = false;
  public isWrongPassword: boolean = false;

  public get usernameControl(): AbstractControl {
    return this.loginForm.controls.username;
  }

  public get passwordControl(): AbstractControl {
    return this.loginForm.controls.password;
  }

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _authService: AuthService,
              private readonly _router: Router) { }

  ngOnInit(): void {
    this._initForm();
  }

  public onLogin(): void {
    this.isWrongPassword = false;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this._authService.login(this.loginForm.getRawValue()).subscribe((res) => {
      this.isLoading = false;
      if (!res.length) {
        this.isWrongPassword = true;
        return;
      }
      this._router.navigate(['/list-users']);
    });
  }

  private _initForm(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(40)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(40),
      ])]
    });
  }
}
