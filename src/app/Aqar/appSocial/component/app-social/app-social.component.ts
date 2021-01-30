import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { appSocial } from '../../models/appSocialModel';
import { AppSocialService } from '../../services/app-social.service';
import { EditAppSocialComponent } from '../edit-app-social/edit-app-social.component';

@Component({
  selector: 'app-app-social',
  templateUrl: './app-social.component.html',
  styleUrls: ['./app-social.component.css']
})
export class AppSocialComponent implements OnInit {
  appList: any = [];
  appSocial: appSocial[] = [];
  private subscription: Subscription[] = [];
  offerForm:FormGroup;
  readonly cat = 'https://aqar.wothoq.co/api/admin/social/store';
  closeResult:string;

  constructor(private socialService: AppSocialService,private modalService: NgbModal,
              private router: Router,private httpClient: HttpClient,
              private ngZone: NgZone, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.subscription.push(this.socialService.getallApps().subscribe(
      (response: any) => {
        this.appSocial = response;
        this.appList = response.social;
        console.log(this.appSocial);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.addApp();
  }
  // tslint:disable-next-line:variable-name
  DeleteApplication(social_id: number) {
    this.socialService.deleteApp(social_id).subscribe(
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
  editItem(userModel: appSocial) {
    const ref = this.modalService.open(EditAppSocialComponent, { centered: true });
    ref.componentInstance.selectedApp = userModel;

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
addApp() {
  this.offerForm = this.fb.group({
    name: [''],
    link: [''],
    logo: ['']
  });
}
// tslint:disable-next-line:typedef
onSubmit() {
  const uploadData = new FormData();
  uploadData.append('logo', this.offerForm.get('logo').value);
  uploadData.append('name', this.offerForm.get('name').value);
  uploadData.append('link', this.offerForm.get('link').value);
  this.httpClient.post(this.cat, uploadData, {
    reportProgress: true,
    observe: 'events'
  })
    .subscribe(event => {
      console.log(event); // handle event here
      // this.ngZone.run(() => this.router.navigateByUrl('/aqar/AppSocial'));
      this.ngOnInit();
    });
  this.modalService.dismissAll(); 
}

onFileChanged1(event){
if (event.target.files && event.target.files[0]) {
  const reader = new FileReader();
  reader.onload = () => {
    this.offerForm.get('logo').setValue(event.target.files[0]);
  };
  reader.readAsDataURL(event.target.files[0]);
}

}
}
