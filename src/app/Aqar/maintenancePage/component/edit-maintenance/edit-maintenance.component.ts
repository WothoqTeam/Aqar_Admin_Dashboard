import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Maintenance } from '../../models/maintenanceModel';
import { MaintenanceService } from '../../services/maintenance.service';

@Component({
  selector: 'app-edit-maintenance',
  templateUrl: './edit-maintenance.component.html',
  styleUrls: ['./edit-maintenance.component.css']
})
export class EditMaintenanceComponent implements OnInit {
  selectedRow: Maintenance;
  editForm: FormGroup;
  isLoading = false;
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,
              private usersService: MaintenanceService,private httpClient: HttpClient,
              private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.setForm();
  }
  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.usersService.UpdateRequest(this.editForm.value).subscribe(x => {
      this.isLoading = false;
      this.modal.close('Yes');

    },
      error => {
        this.isLoading = false;
      });
  }
  get editFormData() { return this.editForm.controls; }
  private setForm() {
    console.log(this.selectedRow);
    this.editForm = this.formBuilder.group({
      maintenance_id: [this.selectedRow.id, Validators.required],
      user_name: [this.selectedRow.user_name, Validators.required],
      type: [this.selectedRow.type, Validators.required],
      mobile: [this.selectedRow.user.mobile, Validators.required],
    });

  }
}
