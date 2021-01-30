import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppSetting } from '../../models/appSettingModel';
import { AppsettingService } from '../../services/appsetting.service';
import { EditAppSettingComponent } from '../edit-app-setting/edit-app-setting.component';

@Component({
  selector: 'app-app-setting',
  templateUrl: './app-setting.component.html',
  styleUrls: ['./app-setting.component.css']
})
export class AppSettingComponent implements OnInit {
  appList: any = [];
  appSet: AppSetting[] = [];
  private subscription: Subscription[] = [];
  closeResult: string;
  readonly cat = 'https://aqar.wothoq.co/api/admin/setting/store';
  offerForm: FormGroup;
  
  constructor(private companiesService:AppsettingService,private modalService: NgbModal,private router: Router,
              private ngZone: NgZone, public fb: FormBuilder,private httpClient: HttpClient ) { }

  ngOnInit(): void {
    this.subscription.push(this.companiesService.getallApps().subscribe(
      (response: any) => {
        this.appSet = response;
        this.appList = response.setting;
        console.log(this.appSet);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.addApp();
  }
  DeleteApplication(setting_id: number) {
    this.companiesService.deleteApp(setting_id).subscribe(
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

  editItem(userModel: AppSetting) {
    const ref = this.modalService.open(EditAppSettingComponent, { centered: true });
    ref.componentInstance.selectedApp = userModel;

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
  addApp() {
    this.offerForm = this.fb.group({
      app_name: [''],
      app_version: [''],
      logo:['']
    });
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    const uploadData = new FormData();
    uploadData.append('logo', this.offerForm.get('logo').value);
    uploadData.append('app_name', this.offerForm.get('app_name').value);
    uploadData.append('app_version', this.offerForm.get('app_version').value);
    this.httpClient.post(this.cat, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
        this.ngOnInit();
      });
    this.modalService.dismissAll(); //dismiss the modal

 }

 onFileChanged(event){
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      this.offerForm.get('logo').setValue(event.target.files[0]);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

 }


}
