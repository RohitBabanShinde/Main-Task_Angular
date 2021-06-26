import { CustomValidators } from './../../validator.service';
import { UserService } from './../../user.service';
import { UserClass } from './../../Shared/Info-user';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-mangage-user',
  templateUrl: './mangage-user.component.html',
  styleUrls: ['./mangage-user.component.css']
})

export class MangageUserComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  imageError: string;
  formData: FormGroup;
  userDetailsedit: UserClass;
  message: string;
  interestList: string[] = [];
  public formSubmit = false;

  constructor(public activeModal: NgbActiveModal, private _userservice: UserService, private _router: Router) {
  }
  @Input() id;
  ngOnInit() {
    this.formData = new FormGroup({
      fname: new FormControl('', [Validators.required, CustomValidators.validateName]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required]),
      age: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      address: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      interests: new FormControl("", Validators.required),
      image: new FormControl(null),
      image1: new FormControl(null, CustomValidators.validateImage),
      ischeck: new FormControl('', [Validators.required])
    });

    console.log('ng on init');
    console.log(this._userservice.edit);
    this.id = this._userservice.edit;
    if (this.id) {
      console.log(this.id);
      this.getUpdatedUser();
    }
  }
  getUpdatedUser() {
    this._userservice.getUser(this.id).subscribe(data => {
      console.log(data);
      this.userDetailsedit = data[0];
      console.log(this.userDetailsedit);
    });
    this.formData.patchValue({
      fname: this.userDetailsedit.fname,
      lname: this.userDetailsedit.lname,
      email: this.userDetailsedit.email,
      mobile: this.userDetailsedit.mobile,
      state: this.userDetailsedit.state,
      country: this.userDetailsedit.country

    });
  }

  onSubmit() {
    this.formSubmit = true;
    if (this.id) {
      if (this.formData.valid) {
        this._userservice.userUpdate(this.formData.value, this.id).subscribe(data => {
          console.log(data);
          this.activeModal.close({ success: true, id: data.id });
          this.getUpdatedUser();
          this._router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this._router.navigate(['user-profile']);
          });

          this._router.navigate(['/user-profile/']);
        }, err => {
          console.log(err);
        });
      }
    } else {
      if (this.formData.valid) {
        this._userservice.userAdd(this.formData.value).subscribe(data => {
          console.log(data);
          this.activeModal.close({ success: true, id: data.id });
          this._router.navigate(['/user-profile/']);
        }, err => {
          console.log(err);
        });
      }
    }

  }


  onFileSelected(event: Event) {
    this.imageError = null;
    window.URL = window.URL;
    const file = (event.target as HTMLInputElement).files[0];
    console.log(1);
    if (file) {

      this.formData.get('image1').patchValue(file.name);
      const img = new Image();
      img.src = window.URL.createObjectURL(file);
      console.log(2);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        img.src = reader.result as string;
        img.onload = () => {
          const height = img.naturalHeight;
          const width = img.naturalWidth;
          if (width > 310 && height > 325) {
            console.log(width);
            console.log(height);
            this.formData.get('image').patchValue('../../../assets/Image/userprofile.png');
            this.imageError = ('Please upload an image with in 310*325px resolution');
          }
          console.log('Width and Height', width, height);
        };
      };

      console.log(4);
      let readerr = new FileReader();
      readerr.onload = this._handleReaderLoaded.bind(this);
      readerr.readAsBinaryString(file);
    }
  }



  _handleReaderLoaded(readerEvt) {
    console.log(5);
    let binaryString = readerEvt.target.result;
    this.formData.get('image').patchValue('data:image/png;base64,' + btoa(binaryString));
  }



  validationField(type: string, field: string) {
    return (
      this.formData.get(`${field}`).hasError(type) &&
      (this.formData.get(`${field}`).dirty ||
        this.formData.get(`${field}`).touched ||
        this.formSubmit)
    );
  }

  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;

  //   // Add our fruit
  //   if ((value || '').trim()) {
  //     this.interestList.push(value);
  //     this.formData.patchValue({
  //       interests: this.interestList
  //     })
  //   }

  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.interestList.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(item): void {
    const index = this.interestList.indexOf(item);

    if (index >= 0) {
      this.interestList.splice(index, 1);
    }
  }
}





