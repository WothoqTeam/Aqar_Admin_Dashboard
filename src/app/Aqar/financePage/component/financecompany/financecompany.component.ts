import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { aqarModel } from 'src/app/Aqar/aqarPage/models/aqarModels';
import { AqarService } from 'src/app/Aqar/aqarPage/services/aqar.service';
import { User } from 'src/app/Aqar/usersPage/models/userModel';
import { UserService } from 'src/app/Aqar/usersPage/services/user.service';
import Swal from 'sweetalert2';
import { Finance } from '../../models/financeModel';
import { FinanceServiceService } from '../../services/finance-service.service';
import { EditFinanceAppComponent } from '../edit-finance-app/edit-finance-app.component';
import { ViewDetailsComponent } from '../view-details/view-details.component';

@Component({
  selector: 'app-financecompany',
  templateUrl: './financecompany.component.html',
  styleUrls: ['./financecompany.component.css']
})
export class FinancecompanyComponent implements OnInit {
  finanList: any = [];
  finance: Finance[] = [];
  private subscription: Subscription[] = [];
  userList: any = [];
  user: User[] = [];
  aqarList: any = [];
  aqar: aqarModel[] = [];
  aqar1List: any = [];
  aqar1: aqarModel[] = [];
  aqar2List: any = [];
  aqar2: aqarModel[] = [];
  aqar3List: any = [];
  aqar3: aqarModel[] = [];
  closeResult: string;
  aqarForm: FormGroup;
  constructor(private finservice: FinanceServiceService, private modalService: NgbModal, private userService:UserService,
              private aqarService: AqarService,private fb: FormBuilder, private router: Router,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    this.addAqar();
    this.addSessionHand();
    this.addSessionMonths();
    this.addSessionAmount();
   
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
    this.subscription.push(this.userService.getalluser().subscribe(
      (response: any) => {
        this.user = response;
        this.userList = response.users;
        console.log(this.user);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.subscription.push(this.aqarService.getallAqars(0).subscribe(
      (response: any) => {
        this.aqar = response;
        this.aqarList = response.data;
        console.log(this.aqar);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.subscription.push(this.aqarService.getallAqars(1).subscribe(
      (response: any) => {
        this.aqar1 = response;
        this.aqar1List = response.data;
        console.log(this.aqar1);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.subscription.push(this.aqarService.getallAqars(2).subscribe(
      (response: any) => {
        this.aqar2 = response;
        this.aqar2List = response.data;
        console.log(this.aqar2);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.subscription.push(this.aqarService.getallAqars(3).subscribe(
      (response: any) => {
        this.aqar3 = response;
        this.aqar3List = response.data;
        console.log(this.aqar3);
      },
      (err) => {
        console.log(err);
      }
    ));
   

  }
  DeleteApplication(finance_id: number) {
    this.finservice.deleteFinance(finance_id).subscribe(
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
  editItem(userModel: Finance) {
    const ref = this.modalService.open(EditFinanceAppComponent, { centered: true });
    ref.componentInstance.selectedcons = userModel;

    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');

      })
  }
  viewDetails(userModel: Finance) {
    const ref = this.modalService.open(ViewDetailsComponent, { centered: true });
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
  addAqar() {
    this.aqarForm = this.fb.group({
      full_name: ['', Validators.required],
      bank_salary:['',Validators.required],
      salary:['',Validators.required],
      total_salary: ['', Validators.required],
      deduction:['', Validators.required],
      employer:['', Validators.required],
      occupation: ['', Validators.required],
      service_length:['',Validators.required],
      remain_service_life:['',Validators.required],
      hand_commitment: this.fb.array([]),
      monthly_amount:this.fb.array([]),
      remaining_months:this.fb.array([]),
      aqar_type:['', Validators.required],
      aqar_id:['', Validators.required],
      user_id:['', Validators.required],

    });
  }
  get hand_commitment() : FormArray {
    return this.aqarForm.get('hand_commitment') as FormArray
  }
 
  get monthly_amount() : FormArray {
    return this.aqarForm.get("monthly_amount") as FormArray
  }

  get remaining_months() : FormArray {
    return this.aqarForm.get("remaining_months") as FormArray
  }

  
  newSessionsHand(): FormGroup {
    return this.fb.group({
      session: '',
    });
  }

  newSessionsAmount(): FormGroup {
    return this.fb.group({
      session: '',
    });
  }

  newSessionsMonths(): FormGroup {
    return this.fb.group({
      session: '',
    });
  }
  addSessionHand() {
    this.hand_commitment.push(this.newSessionsHand());
  }

  addSessionAmount() {
    this.monthly_amount.push(this.newSessionsAmount());
  }
  addSessionMonths() {
    this.remaining_months.push(this.newSessionsMonths());
  }
  removeSessionsHand(i:number) {
    this.hand_commitment.removeAt(i);
  }
 
  removeSessionsAmount(i:number) {
    this.monthly_amount.removeAt(i);
  }

  removeSessionsMonths(i:number) {
    this.remaining_months.removeAt(i);
  }

  // tslint:disable-next-line:typedef 
  submitForm() {
    this.finservice.addApp(this.aqarForm.value).subscribe(res => {
      console.log('Issue added!');
      this.ngZone.run(() => this.router.navigateByUrl('/aqar/finance'));
    });
  }

}
