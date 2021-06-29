
import { UserService } from '../../user.service';
import { UserClass } from '../../Shared/Info-user';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatAutocomplete} from '@angular/material/autocomplete'
import {FormErrorService } from '../../form-error.service';

@Component({
  selector: 'app-mangage-user',
  templateUrl: './mangage-user.component.html',
  styleUrls: ['./mangage-user.component.css']
})

export class MangageUserComponent implements OnInit {
  @Input() id;
  image: string;
  formData: FormGroup;
  userDetailsedit: UserClass;
  message: string;
  public formSubmit = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  interests: string[]= [];
  constructor(public activeModal: NgbActiveModal, private userService: UserService, private router: Router) {
  }
  @ViewChild('auto') matAutocomplete:  MatAutocomplete;

  ngOnInit(): void {
    this.formData = new FormGroup({
      fname: new FormControl('', [Validators.required, FormErrorService .Name]),
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
      image1: new FormControl(null, FormErrorService .image),
      ischeck: new FormControl('', [Validators.required])
    });
    console.log(this.userService.edit);
    this.id = this.userService.edit;
    if (this.id) {
      console.log(this.id);
      this.formUpdate();
    }
  }

  formUpdate() {
    this.userService.getUser(this.id).subscribe(data => {
      this.userDetailsedit = data[0];
    });
     this.formData.setValue({
       fname: this.userDetailsedit.fname,
      lname: this.userDetailsedit.lname,
      email: this.userDetailsedit.email,
       mobile: this.userDetailsedit.mobile,
      state: this.userDetailsedit.state,
      country: this.userDetailsedit.country,
       interests: this.userDetailsedit.interests
     });

  }

  SubmitForm() {
    this.formSubmit = true;
    if (this.id) {
      if (this.formData.valid) {
        this.userService.userUpdate(this.formData.value, this.id).subscribe(data => {
          this.activeModal.close({ success: true, id: data.id });
          this.formUpdate();
          this.router.navigateByUrl('/src/app/User/profile', { skipLocationChange: true }).then(() => {
            this.router.navigate(['user-profile']);
          });
          this.router.navigate(['/user-profile/']);
        }, err => {
          console.log(err);
        });
      }
    } else {
      if (this.formData.valid) {
        this.userService.userAdd(this.formData.value).subscribe(data => {
          this.activeModal.close({ success: true, id: data.id });
          this.router.navigate(['/user-profile/']);
        }, err => {
          console.log(err);
        });
      }
    }
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.interests.push(value);
    }

    if (input) {
      input.value = '';
    }
  }

  remove(item): void {
    const index = this.interests.indexOf(item);

    if (index >= 0) {
      this.interests.splice(index, 1);
    }
  }


  ImageFile(event: Event) {
    this.image = null;
    window.URL = window.URL;
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.formData.get('image1').patchValue(file.name);
      const img = new Image();
      img.src = window.URL.createObjectURL(file);
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
            this.image = ('Please upload an image with in 310*325px resolution');
          }
        };
      };

      let readerr = new FileReader();
      readerr.onload = this.handleReaderLoaded.bind(this);
      readerr.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.formData.get('image').patchValue('data:image/png;base64,' + btoa(binaryString));
  }

  FormvalidationField(type: string, field: string) {
    return (
      this.formData.get(`${field}`).hasError(type) &&
      (this.formData.get(`${field}`).dirty ||
        this.formData.get(`${field}`).touched ||
        this.formSubmit)
    );
  }
}





