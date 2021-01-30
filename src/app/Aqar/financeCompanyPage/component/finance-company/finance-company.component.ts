import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Company } from '../../models/companyModel';
import { CompaniesService } from '../../services/companies.service';
import { EditCompanyComponent } from '../edit-company/edit-company.component';

@Component({
  selector: 'app-finance-company',
  templateUrl: './finance-company.component.html',
  styleUrls: ['./finance-company.component.css']
})
export class FinanceCompanyComponent implements OnInit {
  companyList: any = [];
  company: Company[] = [];
  private subscription: Subscription[] = [];
  closeResult: string;
  companyForm: FormGroup;
  readonly cat = 'https://aqar.wothoq.co/api/admin/companies/store';
  constructor(private companiesService:CompaniesService,private modalService: NgbModal,
              private router: Router,private ngZone: NgZone,public fb: FormBuilder,
              private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.subscription.push(this.companiesService.getallcompany().subscribe(
      (response: any) => {
        this.company = response;
        this.companyList = response.companies;
        console.log(this.company);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.addfinance();
    }
  DeleteApplication(finance_id: number) {
    this.companiesService.deleteCompany(finance_id).subscribe(
      res => {
        this.ngOnInit();
        Swal.fire({
          text:   "تم الحذف بنجاح",
          icon: 'success'
        });
      },
      err => { console.log(err); }
    );
  }
  editItem(userModel: Company) {
    const ref = this.modalService.open(EditCompanyComponent, { centered: true });
    ref.componentInstance.selectedcompany = userModel;

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
 
  // tslint:disable-next-line:typedef
  addfinance() {
    this.companyForm = this.fb.group({
      name: [''],
      username: [''],
      email:[''],
      mobile:[''],
      profile_pic:['']
    });
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    const uploadData = new FormData();
    uploadData.append('profile_pic', this.companyForm.get('profile_pic').value);
    uploadData.append('name', this.companyForm.get('name').value);
    uploadData.append('username', this.companyForm.get('username').value);
    uploadData.append('email', this.companyForm.get('email').value);
    uploadData.append('mobile', this.companyForm.get('mobile').value);
    console.log(uploadData);
    this.httpClient.post(this.cat, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
        this.ngZone.run(() => this.router.navigateByUrl('/aqar/financecompany'));
      });
 }

 onFileChanged(event){
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      this.companyForm.get('profile_pic').setValue(event.target.files[0]);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

 }
}
