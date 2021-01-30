import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Finance } from '../../models/financeModel';
import { FinanceServiceService } from '../../services/finance-service.service';

@Component({
  selector: 'app-edit-finance-app',
  templateUrl: './edit-finance-app.component.html',
  styleUrls: ['./edit-finance-app.component.css']
})
export class EditFinanceAppComponent implements OnInit {
  selectedcons: Finance;
  editForm: FormGroup;
  isLoading = false;
  private subscription: Subscription[] = [];
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,
              private usersService: FinanceServiceService,private httpClient: HttpClient,
              private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.setForm();
  }
  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.usersService.UpdateApp(this.editForm.value).subscribe(x => {
      this.isLoading = false;
      this.modal.close('Yes');

    },
      error => {
        this.isLoading = false;
      });
  }
  get editFormData() { return this.editForm.controls; }
  private setForm() {
    console.log(this.selectedcons);
    this.editForm = this.formBuilder.group({
      finance_id: [this.selectedcons.id, Validators.required],
      full_name: [this.selectedcons.full_name, Validators.required],
      bank_salary:[this.selectedcons.bank_salary, Validators.required],
      salary:[this.selectedcons.salary, Validators.required],
      total_salary: [this.selectedcons.total_salary, Validators.required],
      deduction: [this.selectedcons.deduction, Validators.required],
      employer: [this.selectedcons.employer, Validators.required],
      occupation: [this.selectedcons.occupation, Validators.required],
    });

  }
}
