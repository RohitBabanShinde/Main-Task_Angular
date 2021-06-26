import { MangageUserComponent } from './../mangage-user/mangage-user.component';
import { UserClass} from './../../Shared/Info-user';
import { UserService } from './../../user.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id = null;
  profileImage: string;
  usernamehere="freddi here";
  public userDetails : UserClass;
  constructor( private sanitizer:DomSanitizer,private _modalCtrl: NgbModal,private _route: ActivatedRoute, private _userService: UserService) {
    this.id = +this._route.snapshot.paramMap.get('id');
    }

  ngOnInit() {

    console.log(this.id);
     this._userService.getUser(this.id).subscribe(data=>{
      console.log(data);

      this.userDetails=data[0];
  })
}
  profileEdit() {


    const modal= this._modalCtrl.open(MangageUserComponent,{size: 'lg'});
    modal.componentInstance.id=null;
    modal.componentInstance.section='profile-data';

    this._userService.edit=this.id;

   }

}
