import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/Aqar/financeCompanyPage/models/companyModel';
import { CompaniesService } from 'src/app/Aqar/financeCompanyPage/services/companies.service';
import Swal from 'sweetalert2';
import { Consultant } from '../../models/consultant';
import { ConsultantServiceService } from '../../services/consultant-service.service';
import { DetailsConsultantComponent } from '../details-consultant/details-consultant.component';
import { EditConsultantComponent } from '../edit-consultant/edit-consultant.component';

@Component({
  selector: 'app-consultantuser',
  templateUrl: './consultantuser.component.html',
  styleUrls: ['./consultantuser.component.css']
})
export class ConsultantuserComponent implements OnInit {
  consList: any = [];
  consultant: Consultant[] = [];
  private subscription: Subscription[] = [];
  closeResult: string;
  companyForm: FormGroup;
  offerForm: FormGroup;
  companyList: any = [];
  company: Company[] = [];
  
  constructor(private consService: ConsultantServiceService,private modalService: NgbModal,
              private addService: ConsultantServiceService, private router: Router,
              private ngZone: NgZone,public fb: FormBuilder,
              private companyservice: CompaniesService) { }

  ngOnInit(): void {
    this.subscription.push(this.consService.getallconsultant().subscribe(
      (response: any) => {
        this.consultant = response;
        this.consList = response.users;
        console.log(this.consultant);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.subscription.push(this.companyservice.getallcompany().subscribe(
      (response: any) => {
        this.company = response;
        this.companyList = response.companies;
        console.log(this.company);
      },
      (err) => {
        console.log(err);
      }
    ));

    this.addconsultant(); 
  }
   DeleteApplication(id: number) {
     this.consService.deleteConsultant(id).subscribe(
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
   editItem(userModel: Consultant) {
    const ref = this.modalService.open(EditConsultantComponent, { centered: true });
    ref.componentInstance.selectedcons = userModel;

    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');

      })
  }
  viewDetails(userModel: Consultant) {
    const ref = this.modalService.open(DetailsConsultantComponent, { centered: true });
    ref.componentInstance.oneRow = userModel;
  
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
  addconsultant() {
    this.offerForm = this.fb.group({
      username: ['', Validators.required],
      email:['',Validators.required],
      mobile:['',Validators.required],
      password: ['', Validators.required],
      name:['', Validators.required],
      company_id:['', Validators.required],

    });
  }
  // tslint:disable-next-line:typedef 
  submitFormBank() {
    this.addService.addConsultant(this.offerForm.value).subscribe(res => {
      console.log('Issue added!'); 
      this.ngZone.run(() => this.router.navigateByUrl('/aqar/consultant'));
    });
  }
}
