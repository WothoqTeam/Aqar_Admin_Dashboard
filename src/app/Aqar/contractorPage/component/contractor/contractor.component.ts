import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { contractorModel } from '../../models/contractorModel';
import { ContractorService } from '../../services/contractor.service';
import { EditContractorComponent } from '../edit-contractor/edit-contractor.component';

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.css']
})
export class ContractorComponent implements OnInit {
  consList: any = [];
  contractor: contractorModel[] = [];
  private subscription: Subscription[] = [];
  closeResult: string;
  consForm: FormGroup;
  conForm: FormGroup;
  arrayOfImages = [];
  readonly cat = 'http://aqar.wothoq.co/api/admin/contractors/store';

  constructor(private consService: ContractorService, private modalService: NgbModal,
              private router: Router,private httpClient:HttpClient,
              private ngZone: NgZone, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.subscription.push(this.consService.getallcontractorModel().subscribe(
      (response: any) => {
        this.contractor = response;
        this.consList = response.contractors;
        console.log(this.contractor);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.addcontractor()
  }
  DeleteApplication(id: number) {
    this.consService.deletecontractorModel(id).subscribe(
     res => {
       this.ngOnInit();
       Swal.fire({
        text: 'تم الحذف بنجاح',
          icon: 'success'
        });
      },
      err => { console.log(err); }
   );
  }

  editItem(userModel: contractorModel) {
    const ref = this.modalService.open(EditContractorComponent, { centered: true });
    ref.componentInstance.selectedcons = userModel;
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
  addcontractor() {
    this.consForm = this.fb.group({
      contractor_id: ['', Validators.required],
      name: ['', Validators.required],
      address:['', Validators.required],
      details:['', Validators.required],
      mobile:['', Validators.required],
      photos:[],
      picture:['', Validators.required],

    });
  }
  // tslint:disable-next-line:typedef 
  onSubmit() {
    const uploadData = new FormData() ;
    console.log(this.consForm);

    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.consForm.get('photos').value.length; index++) {
      uploadData.append('photos[]', this.consForm.get('photos').value[index]);
    }
    uploadData.append('name', this.consForm.get('name').value);
    uploadData.append('address', this.consForm.get('address').value); 
    uploadData.append('details', this.consForm.get('details').value);
    uploadData.append('mobile', this.consForm.get('mobile').value);
    uploadData.append('picture', this.consForm.get('picture').value);
    console.log(uploadData);
    this.httpClient.post(this.cat, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
        this.ngOnInit();
      });
      this.modalService.dismissAll();
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
      this.consForm.get('photos').setValue(this.arrayOfImages);
      console.log('pic', this.consForm.get('photos'));
      reader.readAsDataURL(event.target.files[0]);
    }

  }
  onFileChanged1(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.consForm.get('picture').setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }

  }
}
