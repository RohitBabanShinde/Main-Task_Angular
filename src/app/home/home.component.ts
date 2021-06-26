import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MangageUserComponent } from './../User/mangage-user/mangage-user.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private modalctr: NgbModal, private _router: Router, private dialog:MatDialog) { }

  ngOnInit(): void {
  }
   onRegister() {
     const modal = this.modalctr.open(MangageUserComponent, {size: 'lg'});
     modal.componentInstance.id = null;
     modal.componentInstance.section = 'profile-data';
    // console.log(modal.result);
     modal.result.then(result => {
      console.log(1);
      if (result.success) {
        // console.log(2);
        // console.log(result.id);
       this._router.navigate([`/user-profile/${result.id}`]);
     }
     }, err => {
       console.log(err);
     });


   }


}
