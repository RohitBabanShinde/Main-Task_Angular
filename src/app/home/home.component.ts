
import { MangageUserComponent } from './../User/manage-user/mangage-user.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  constructor(private modal: NgbModal, private router: Router) {
   }

  ngOnInit(): void {

  }


   onRegister() {
     const modal = this.modal.open(MangageUserComponent,
      {size: 'lg'});
      modal.componentInstance.id = null;
      modal.componentInstance.section = 'profile-data';
      modal.result.then(result => {

      if (result.success) {
        this.router.navigate([`/user-profile/${result.id}`]);
     }
      }, err => {
       console.log(err);
      });


   }


}
