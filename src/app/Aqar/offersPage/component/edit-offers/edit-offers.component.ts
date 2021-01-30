import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Offers } from '../../models/offersModel';
import { OffersService } from '../../services/offers.service';

@Component({
  selector: 'app-edit-offers',
  templateUrl: './edit-offers.component.html',
  styleUrls: ['./edit-offers.component.css']
})
export class EditOffersComponent implements OnInit {
  selectedoffer:Offers;
  editForm: FormGroup;
  isLoading = false;
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,
    private usersService: OffersService,private httpClient:HttpClient,
    private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.setForm();
  }
  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.usersService.UpdateOffer(this.editForm.value).subscribe(x => {
      this.isLoading = false;
      this.modal.close('Yes');

    },
      error => {
        this.isLoading = false;
      });
  }
  get editFormData() { return this.editForm.controls; }
  private setForm() {
    console.log(this.selectedoffer);
    this.editForm = this.formBuilder.group({
      offer_id: [this.selectedoffer.id, Validators.required],
      salary_transferred_to_bank: [this.selectedoffer.salary_transferred_to_bank, Validators.required],
      funding_amount:[this.selectedoffer.funding_amount, Validators.required],
      profits:[this.selectedoffer.profits, Validators.required],
      total_amount_support:[this.selectedoffer.total_amount_support, Validators.required],
      loan_repayment_period:[this.selectedoffer.loan_repayment_period, Validators.required],
      years_number_loan_repayment_period:[this.selectedoffer.years_number_loan_repayment_period, Validators.required],
      month_number_loan_repayment_period:[this.selectedoffer.month_number_loan_repayment_period, Validators.required],
      first_installment:[this.selectedoffer.first_installment, Validators.required],
      second_installment:[this.selectedoffer.second_installment, Validators.required],
      month_number_first_installment:[this.selectedoffer.month_number_first_installment, Validators.required],
      month_number_second_installment:[this.selectedoffer.month_number_second_installment, Validators.required],
    });

  }

}
