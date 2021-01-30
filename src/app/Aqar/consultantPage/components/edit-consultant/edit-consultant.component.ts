import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Consultant } from '../../models/consultant';
import { ConsultantServiceService } from '../../services/consultant-service.service';

@Component({
  selector: 'app-edit-consultant',
  templateUrl: './edit-consultant.component.html',
  styleUrls: ['./edit-consultant.component.css']
})
export class EditConsultantComponent implements OnInit {
  consList: any = [];
  consultant: Consultant[] = [];
  selectedcons: Consultant;
  editForm: FormGroup;
  isLoading = false;
  private subscription: Subscription[] = [];

  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,
              private usersService: ConsultantServiceService,private httpClient: HttpClient,
              private formBuilder: FormBuilder, private router: Router, private consServices: ConsultantServiceService) { }

  ngOnInit(): void {
    this.subscription.push(this.consServices.getallconsultant().subscribe(
      (response: any) => {
        this.consultant = response;
        this.consList = response.users;
        console.log(this.consultant);
      },
      (err) => {
        console.log(err);
      }
    ));

    this.setForm();

  }
  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.usersService.UpdateConsultant(this.editForm.value).subscribe(x => {
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
      consultant_id: [this.selectedcons.id, Validators.required],
      name: [this.selectedcons.name, Validators.required],
      username:[this.selectedcons.username, Validators.required],
      email:[this.selectedcons.email, Validators.required],
      mobile:[this.selectedcons.mobile, Validators.required],
    });

  }
}
