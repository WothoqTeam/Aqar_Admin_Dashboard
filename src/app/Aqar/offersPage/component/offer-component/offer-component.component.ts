import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Consultant } from 'src/app/Aqar/consultantPage/models/consultant';
import { ConsultantServiceService } from 'src/app/Aqar/consultantPage/services/consultant-service.service';
import { Finance } from 'src/app/Aqar/financePage/models/financeModel';
import { FinanceServiceService } from 'src/app/Aqar/financePage/services/finance-service.service';
import Swal from 'sweetalert2';
import { Offers } from '../../models/offersModel';
import { OffersService } from '../../services/offers.service';
import { EditOffersComponent } from '../edit-offers/edit-offers.component';

@Component({
  selector: 'app-offer-component',
  templateUrl: './offer-component.component.html',
  styleUrls: ['./offer-component.component.css']
})
export class OfferComponentComponent implements OnInit {
  offerList: any = [];
  offer: Offers[] = [];
  private subscription: Subscription[] = [];
  
  offerForm: FormGroup;
  consList: any = [];
  consultant: Consultant[] = [];
  finanList: any = [];
  finance: Finance[] = [];
  closeResult: string;
  constructor(private offerService: OffersService,private modalService: NgbModal,private addService: OffersService,
              private router: Router,private ngZone: NgZone,public fb: FormBuilder
             ,private consService: ConsultantServiceService,private finservice: FinanceServiceService) { }

  ngOnInit(): void {
    this.subscription.push(this.offerService.getalloffer().subscribe(
      (response: any) => {
        this.offer = response;
        this.offerList = response.offers;
        console.log(this.offer);
      },
      (err) => {
        console.log(err);
      }
    ));
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
    this.subscription.push(this.finservice.getAllfinance().subscribe(
      (response: any) => {
        this.finance = response;
        this.finanList = response.finance_application;
        console.log(this.finance);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.addOffer();
  }
  DeleteOffer(offer_id: number) {
    this.offerService.deleteOffer(offer_id).subscribe(
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
  editItem(userModel: Offers) {
    const ref = this.modalService.open(EditOffersComponent, { centered: true });
    ref.componentInstance.selectedoffer = userModel;

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
  addOffer() {
    this.offerForm = this.fb.group({
      offer_id: ['', Validators.required],
      consultant_id:['',Validators.required],
      finance_id:['',Validators.required],
      salary_transferred_to_bank: ['', Validators.required],
      funding_amount:['', Validators.required],
      profits:['', Validators.required],
      total_amount_support:['', Validators.required],
      loan_repayment_period:['', Validators.required],
      years_number_loan_repayment_period:['', Validators.required],
      month_number_loan_repayment_period:['', Validators.required],
      first_installment:['', Validators.required],
      second_installment:['', Validators.required],
      month_number_first_installment:['', Validators.required],
      month_number_second_installment:['', Validators.required],
    });
  }
  // tslint:disable-next-line:typedef
  submitFormBank() {
    this.addService.addOffers(this.offerForm.value).subscribe(res => {
      console.log('Issue added!');
      this.ngZone.run(() => this.router.navigateByUrl('/aqar/offers'));
    });
  }
}
