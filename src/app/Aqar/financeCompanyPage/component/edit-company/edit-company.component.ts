import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Company } from '../../models/companyModel';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
  selectedcompany: Company;
  editForm: FormGroup;
  isLoading = false;
  readonly cat = 'https://aqar.wothoq.co/api/admin/companies/update';
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,
    private usersService: CompaniesService,private httpClient:HttpClient,
    private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.setForm();
  }
  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.editForm.get('profile_pic').setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    const uploadData = new FormData();
    uploadData.append('company_id', this.editForm.get('company_id').value);
    uploadData.append('profile_pic', this.editForm.get('profile_pic').value);
    uploadData.append('name', this.editForm.get('name').value);
    uploadData.append('username', this.editForm.get('username').value);
    uploadData.append('email', this.editForm.get('email').value);
    uploadData.append('mobile', this.editForm.get('mobile').value);
    this.isLoading = true;
    this.httpClient.post(this.cat, uploadData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(x => {
      this.isLoading = false;
      this.modal.close('Yes');
    },
      error => {
        this.isLoading = false;
      });
  }
  get editFormData() { return this.editForm.controls; }
  private setForm() {
    console.log(this.selectedcompany);
    this.editForm = this.formBuilder.group({
      company_id: [this.selectedcompany.id, Validators.required],
      username: [this.selectedcompany.username, Validators.required],
      name: [this.selectedcompany.name, Validators.required],
      email: [this.selectedcompany.email, Validators.required],
      mobile: [this.selectedcompany.mobile, Validators.required],
      profile_pic:[this.selectedcompany.profile_pic,Validators.required]
    });

  }


}
