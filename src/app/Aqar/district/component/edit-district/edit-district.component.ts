import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { districtModel } from '../../models/districtModel';
import { DistrictService } from '../../services/district.service';

@Component({
  selector: 'app-edit-district',
  templateUrl: './edit-district.component.html',
  styleUrls: ['./edit-district.component.css']
})
export class EditDistrictComponent implements OnInit {
  selecteddistrict: districtModel;
  editForm: FormGroup;
  isLoading = false;
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,
              private usersService: DistrictService, private modalService: NgbModal,
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
    console.log(this.selecteddistrict);
    this.editForm = this.formBuilder.group({
      district_id: [this.selecteddistrict.id, Validators.required],
      name_ar: [this.selecteddistrict.name_ar, Validators.required],
    });

  }

}
