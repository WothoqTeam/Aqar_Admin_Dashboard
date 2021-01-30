import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../../models/userModel';
import { UserService } from '../../services/user.service';
import { ChangeStatusComponent } from '../change-status/change-status.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
  userList: any = [];
  user: User[] = [];
  userForm: FormGroup;
  closeResult: string;
  private subscription: Subscription[] = [];
  constructor(private userservice: UserService,private modalService: NgbModal,private router: Router,
              private ngZone: NgZone, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.subscription.push(this.userservice.getalluser().subscribe(
      (response: any) => {
        this.user = response;
        this.userList = response.users;
        console.log(this.user);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.addUser();
  }
  DeleteUser(user_id: number) {
    this.userservice.deleteUser(user_id).subscribe(
      res => {
        this.ngOnInit();
        Swal.fire({
          text:   'تم الحذف بنجاح',
          icon: 'success'
        });
      },
      err => { console.log(err); }
    );
  }
  editItem(userModel: User) {
    const ref = this.modalService.open(EditUserComponent, { centered: true });
    ref.componentInstance.selectedRow = userModel;

    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');
      });
  }
  editItem1(userModel: User) {
    const ref = this.modalService.open(ChangeStatusComponent, { centered: true });
    ref.componentInstance.selectedOrder = userModel;

    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');

      })
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  addUser() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email:['',Validators.required],
      mobile:['',Validators.required],
      password: ['', Validators.required],
      user_id:['', Validators.required],

    });
  }
  // tslint:disable-next-line:typedef 
  submitFormBank() {
    this.userservice.addUser(this.userForm.value).subscribe(res => {
      console.log('Issue added!');
      this.ngZone.run(() => this.router.navigateByUrl('/aqar/User'));
    });
  }
}
