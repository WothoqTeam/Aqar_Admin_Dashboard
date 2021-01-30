import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { cityModels } from 'src/app/Aqar/city/models/cityModel';
import { CityService } from 'src/app/Aqar/city/services/city.service';
import Swal from 'sweetalert2';
import { districtModel } from '../../models/districtModel';
import { DistrictService } from '../../services/district.service';
import { EditDistrictComponent } from '../edit-district/edit-district.component';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  districtList: any = [];
  district: districtModel[] = [];
  citiesList: any = [];
  city: cityModels[] = [];
  closeResult: string;
  issueForm: FormGroup;
  private subscription: Subscription[] = [];
  constructor(private allData: DistrictService,private router: Router,private httpClient: HttpClient,
              private activeRoute: ActivatedRoute,private allDataa: CityService,
              private modalService: NgbModal,public fb: FormBuilder) { }

  ngOnInit(): void {
    this.subscription.push(this.allData.getallDistrict().subscribe(
      (response: any) => {
        this.district = response;
        this.districtList = response.districts;
        console.log(this.district);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.subscription.push(this.allDataa.getallCities().subscribe(
      (response: any) => {
        this.city = response;
        this.citiesList = response.cities;
        console.log(this.city);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.addDistrict();
  }
  open(content) {
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
addDistrict() {
    this.issueForm = this.fb.group({
      city_id: ['', Validators.required],
      name_ar: ['', Validators.required],
      name_en: ['', Validators.required],
    });
  }
  onSubmit() {
    this.allData.addApp(this.issueForm.value).subscribe(res => {
      console.log('Issue added!');
      this.ngOnInit();
    });
    this.modalService.dismissAll(); //dismiss the modal
  }
  editItem(userModel:districtModel) {
    const ref = this.modalService.open(EditDistrictComponent, { centered: true });
    ref.componentInstance.selecteddistrict = userModel;

    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');

      })
  }
  DeleteApplication(id: number) {
    this.allData.deleteApp(id).subscribe(
     res => {
       this.ngOnInit();
       Swal.fire({
        text: 'تم الحذف بنجاح',
          icon: 'success'
        });
      },
      err => { console.log(err); }
   );
  }

}
