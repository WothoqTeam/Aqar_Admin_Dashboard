import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { cityModels } from 'src/app/Aqar/city/models/cityModel';
import { CityService } from 'src/app/Aqar/city/services/city.service';
import { districtModel } from 'src/app/Aqar/district/models/districtModel';
import { DistrictService } from 'src/app/Aqar/district/services/district.service';
import { aqarReport } from '../../models/aqarReport';
import { AqarReportService } from '../../services/aqar-report.service';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent implements OnInit {
  selectedAqar: aqarReport;
  editForm: FormGroup;
  isLoading = false;
  private subscription: Subscription[] = [];

  cityList: any = [];
  city: cityModels [] = [];
 
  districtList: any = [];
  district: districtModel [] = [];
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,
              private editService: AqarReportService ,private httpClient: HttpClient,
              private formBuilder: FormBuilder, private router: Router,
              private cityService: CityService,private districtservice: DistrictService) { }

  ngOnInit(): void {
    this.subscription.push(this.cityService.getallCities().subscribe(
      (response: any) => {
        this.city = response;
        this.cityList = response.cities;
        console.log(this.city);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.subscription.push(this.districtservice.getallDistrict().subscribe(
      (response: any) => {
        this.district = response;
        this.districtList = response.districts;
        console.log(this.district);
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
    this.editService.UpdateAqar(this.editForm.value).subscribe(x => {
      this.isLoading = false;
      this.modal.close('Yes');

    },
      error => {
        this.isLoading = false;
      });
  }
  get editFormData() { return this.editForm.controls; }
  private setForm() {
    console.log(this.selectedAqar);
    this.editForm = this.formBuilder.group({
      aqar_id: [this.selectedAqar.id, Validators.required],
      aqar_type: [this.selectedAqar.aqar_type, Validators.required],
      city: [this.selectedAqar.city, Validators.required],
      district:[this.selectedAqar.district, Validators.required],
      suk_number:[this.selectedAqar.suk_number, Validators.required],
      suk_date: [this.selectedAqar.suk_date, Validators.required],
      area: [this.selectedAqar.area, Validators.required],
      meter_price: [this.selectedAqar.meter_price, Validators.required],
      interfaces_number: [this.selectedAqar.interfaces_number, Validators.required],
    });

  }

}
