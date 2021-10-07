import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IUser} from "../../../models";
import {dateLessThan, onlyDigits} from "../../../validators/validators";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent implements OnInit {
  public userForm: FormGroup;
  public imgURL: string | ArrayBuffer | null;
  public isEditUser: boolean;
  public isLoading: boolean;

  public get photoControl(): AbstractControl {
    return this.userForm.controls.photo;
  }

  public get roleControl(): AbstractControl {
    return this.userForm.controls.role;
  }

  public get usernameControl(): AbstractControl {
    return this.userForm.controls.username;
  }

  public get passwordControl(): AbstractControl {
    return this.userForm.controls.password;
  }

  public get ageControl(): AbstractControl {
    return this.userForm.controls.age;
  }

  public get occupationControl(): AbstractControl {
    return this.userForm.controls.occupation;
  }

  public get educationList(): FormArray {
    return this.userForm.controls.education as FormArray;
  }

  private userId: number;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _dataService: DataService,
              private readonly _route: ActivatedRoute,
              private readonly _router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this._initForm();
    this.isEditUser = this._router.routerState.snapshot.url.includes('/edit-user');

    if (this.isEditUser) {
      this.isLoading = this._dataService.isLoading = true;
      this.userId = parseInt(this._route.snapshot.paramMap.get('id')!, 10);
      this._dataService.getUser(this.userId).subscribe((res) => {
        this._patchForm(res);
        this.isLoading = this._dataService.isLoading = false;
      })
    }
  }

  public onPhotoChange(files: FileList | null): void {
    if (!files || files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) === null) {
      this.toastr.warning('Only images are supported', '', {positionClass: 'toast-top-center'});
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.photoControl.patchValue(reader.result);
    }
  }

  public addUniversity(): void {
    this.educationList.push(this._newUniversities);
  }

  public removeUniversity(index: number): void {
    this.educationList.removeAt(index);
  }

  public createUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isLoading = this._dataService.isLoading = true;
    this._dataService.createUser(this.userForm.getRawValue()).subscribe(() => {
      this.toastr.success('User successfully created', '', {positionClass: 'toast-top-center'});
      this._router.navigate(['/list-users']);
    })
  }

  public editUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isLoading = this._dataService.isLoading = true;
    this._dataService.editUser(this.userForm.getRawValue(), this.userId).subscribe(() => {
      this.toastr.success('User successfully edited', '', {positionClass: 'toast-top-center'});
      this._router.navigate(['/list-users']);
    })
  }

  private _initForm(): void {
    this.userForm = this._formBuilder.group({
      photo: ['', Validators.required],
      role: ['', Validators.required],
      username: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(40)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(40)
      ])],
      age: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(3),
        onlyDigits,
      ])],
      occupation: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(40)
      ])],
      education: this._formBuilder.array([
        this._newUniversities,
      ]),
    });
  }

  private _patchForm(user: IUser): void {
    if (user.photo) {
      this.imgURL = user.photo;
      this.photoControl.patchValue(user.photo);
    }
    this.roleControl.patchValue(user.role);
    this.usernameControl.patchValue(user.username);
    this.passwordControl.patchValue(user.password);
    this.ageControl.patchValue(user.age);
    this.occupationControl.patchValue(user.occupation);

    user.education.forEach((item, index) => {
      if (index) {
        this.educationList.push(this._newUniversities);
      }
      this.educationList.at(index).get('university')?.patchValue(item.university);
      this.educationList.at(index).get('speciality')?.patchValue(item.speciality);
      this.educationList.at(index).get('startDate')?.patchValue(item.startDate);
      this.educationList.at(index).get('endDate')?.patchValue(item.endDate);
    })
  }

  private get _newUniversities(): FormGroup {
    return this._formBuilder.group({
      university: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(40)
      ])],
      speciality: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(40)
      ])],
      startDate: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^\\s*(3[01]|[12][0-9]|0?[1-9])\\.(1[012]|0?[1-9])\\.((?:19|20)\\d{2})\\s*$')
      ])],
      endDate: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^\\s*(3[01]|[12][0-9]|0?[1-9])\\.(1[012]|0?[1-9])\\.((?:19|20)\\d{2})\\s*$')
      ])],
    }, {validators: [dateLessThan('startDate', 'endDate')]});
  }
}
