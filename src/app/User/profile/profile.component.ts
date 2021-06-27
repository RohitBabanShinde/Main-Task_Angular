import { MangageUserComponent } from './../manage-user/mangage-user.component';
import { UserClass} from './../../Shared/Info-user';
import { UserService } from './../../user.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private modal: NgbModal,private route: ActivatedRoute, private userService: UserService) {
    this.id = +this.route.snapshot.paramMap.get('id');
    }

  ngOnInit() {

    console.log(this.id);
     this.userService.getUser(this.id).subscribe(data=>{
      console.log(data);

      this.userDetails=data[0];
  })
}
  profileEdit() {
    const modal= this.modal.open(MangageUserComponent,{size: 'lg'});
    modal.componentInstance.id=null;
    modal.componentInstance.section='profile-data';

    this.userService.edit=this.id;

   }

}
