import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ViewDetailsComponent } from 'src/app/Aqar/maintenancePage/component/view-details/view-details.component';
import { User } from 'src/app/Aqar/usersPage/models/userModel';
import { UserService } from 'src/app/Aqar/usersPage/services/user.service';
import Swal from 'sweetalert2';
import { Maintenance } from '../../models/maintenanceModel';
import { MaintenanceService } from '../../services/maintenance.service';
import { EditMaintenanceComponent } from '../edit-maintenance/edit-maintenance.component';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {
  requestList: any = [];
  request: Maintenance[] = [];
  private subscription: Subscription[] = [];
  closeResult: string;
  userForm: FormGroup;

  userList: any = [];
  user: User[] = [];
  
  arrayOfImages = [];
  readonly cat = 'http://aqar.wothoq.co/api/admin/maintenance/store';
  constructor(private userservice: MaintenanceService,private modalService: NgbModal,
              private router: Router, private useservice: UserService,
              private ngZone: NgZone, public fb: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.subscription.push(this.userservice.getallrequest().subscribe(
      (response: any) => {
        this.request = response;
        this.requestList = response.maintenance;
        console.log(this.request);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.subscription.push(this.useservice.getalluser().subscribe(
      (response: any) => {
        this.user = response;
        this.userList = response.users;
        console.log(this.user);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.addRequest();
  }
  DeleteUser(maintenance_id: number) {
    this.userservice.deleteRequest(maintenance_id).subscribe(
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
  editItem(userModel: Maintenance) {
    const ref = this.modalService.open(EditMaintenanceComponent, { centered: true });
    ref.componentInstance.selectedRow = userModel;

    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');
      });
  }
  viewDetails(userModel: Maintenance) {
    const ref = this.modalService.open(ViewDetailsComponent, { centered: true });
    ref.componentInstance.oneRow = userModel;
  
    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');
      });
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
  addRequest() {
    this.userForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      type: ['', Validators.required],
      pictures: [],
      user_id: ['', Validators.required],

    });
  }
  onSubmit() {
    const uploadData = new FormData();
    console.log(this.userForm);

    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.userForm.get('pictures').value.length; index++) {
      uploadData.append('pictures[]', this.userForm.get('pictures').value[index]);
    }
    uploadData.append('date', this.userForm.get('date').value);
    uploadData.append('time', this.userForm.get('time').value);
    uploadData.append('type', this.userForm.get('type').value);
    uploadData.append('user_id', this.userForm.get('user_id').value);
    console.log(uploadData);
    this.httpClient.post(this.cat, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
        this.ngZone.run(() => this.router.navigateByUrl('/aqar/requestmaintenance'));
      });
  }



  onFileChanged(event) {
    console.log(event.target.files);
    if (event.target.files && event.target.files) {
      const reader = new FileReader();
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < event.target.files.length; index++) {
        console.log(event.target.files[index]);
        this.arrayOfImages.push(event.target.files[index]);
      }
      this.userForm.get('pictures').setValue(this.arrayOfImages);
      console.log('pic', this.userForm.get('pictures'));
      reader.readAsDataURL(event.target.files[0]);
    }

  }

}
