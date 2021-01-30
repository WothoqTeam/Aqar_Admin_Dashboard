import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { contractorModel } from '../../models/contractorModel';
import { ContractorService } from '../../services/contractor.service';

@Component({
  selector: 'app-edit-contractor',
  templateUrl: './edit-contractor.component.html',
  styleUrls: ['./edit-contractor.component.css']
})
export class EditContractorComponent implements OnInit {
  editForm: FormGroup;
  isLoading = false;
  selectedcons: contractorModel;
  private subscription: Subscription[] = [];
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,
              private usersService: ContractorService,private httpClient: HttpClient,
              private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.setForm();
  }
  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.usersService.UpdatecontractorModel(this.editForm.value).subscribe(x => {
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
      contractor_id: [this.selectedcons.id, Validators.required],
      name: [this.selectedcons.name, Validators.required],
      address:[this.selectedcons.address, Validators.required],
      details:[this.selectedcons.details, Validators.required],
      mobile:[this.selectedcons.mobile, Validators.required],
    });

  }

}
