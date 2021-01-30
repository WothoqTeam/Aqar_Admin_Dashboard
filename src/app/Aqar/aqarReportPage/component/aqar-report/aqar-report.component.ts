import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { cityModels } from 'src/app/Aqar/city/models/cityModel';
import { CityService } from 'src/app/Aqar/city/services/city.service';
import { districtModel } from 'src/app/Aqar/district/models/districtModel';
import { DistrictService } from 'src/app/Aqar/district/services/district.service';
import Swal from 'sweetalert2';
import { aqarReport } from '../../models/aqarReport';
import { AqarReportService } from '../../services/aqar-report.service';
import { DetailsReportComponent } from '../details-report/details-report.component';
import { EditAqarComponent } from '../edit-aqar/edit-aqar.component';
import { EditReportComponent } from '../edit-report/edit-report.component';
import { ViewDetailsAqarComponent } from '../view-details-aqar/view-details-aqar.component';

@Component({
  selector: 'app-aqar-report',
  templateUrl: './aqar-report.component.html',
  styleUrls: ['./aqar-report.component.css']
})
export class AqarReportComponent implements OnInit {
  aqarList: any = [];
  aqarReport: aqarReport[] = [];
  private subscription: Subscription[] = [];

  cityList: any = [];
  city: cityModels [] = [];
 
  districtList: any = [];
  district: districtModel [] = [];

  aqar_land:number=0;
  aqar_flat:number=1;
  aqar_villa: number = 2;
  aqar_build:number=3

  closeResult: string;
  LandForm: FormGroup ;
  AqarForm: FormGroup ;
  filterdArray: any[];
  constructor(private ReportService: AqarReportService,private modalService: NgbModal,public fb: FormBuilder,
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

    this.aqarland();
    this.aqarall();
    this.addLand();
    this.addAqar();
  }
//   // tslint:disable-next-line:typedef
//   onChange(event){
//     let x = event.target.value;
//     this.filterFunction(x);
//     console.log("Assss",x);
//     }

// // tslint:disable-next-line:typedef
// public filterFunction(x)
// {
//   this.filterdArray=this.districtList.filter(v=>v.name_ar === x)
// }

aqarland(){
  this.subscription.push(this.ReportService.getallApps(this.aqar_land ).subscribe(
    (response: any) => {
      this.aqarReport = response;
      this.aqarList = response.data;
      console.log(this.aqarReport);
    },
    (err) => {
      console.log(err);
    }
  ));
}
aqarall(){
  this.subscription.push(this.ReportService.getallApps(this.aqar_flat ).subscribe(
    (response: any) => {
      this.aqarReport = response;
      this.aqarList = response.data;
      console.log(this.aqarReport);
    },
    (err) => {
      console.log(err);
    }
  ));
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
addLand(){
  this.LandForm = this.fb.group({
    aqar_type: ['', Validators.required],
    street_asphalt_type: ['',Validators.required],
    city: ['', Validators.required],
    district: ['', Validators.required],
    suk_number: ['', Validators.required],
    suk_date:['', Validators.required],
    area:['', Validators.required],
    street_type:['', Validators.required],
    interfaces_number:['', Validators.required],
    meter_price:['', Validators.required],
    no_planned:['', Validators.required],
    piece_number:['', Validators.required],
    evaluation_date:['', Validators.required],
  });
}
addAqar(){
  this.AqarForm = this.fb.group({
    aqar_type: ['', Validators.required],
    street_asphalt_type: ['',Validators.required],
    city: ['', Validators.required],
    district: ['', Validators.required],
    suk_number: ['', Validators.required],
    suk_date:['', Validators.required],
    area:['', Validators.required],
    street_type:['', Validators.required],
    interfaces_number:['', Validators.required],
    meter_price:['', Validators.required],
    no_planned:['', Validators.required],
    piece_number:['', Validators.required],
    evaluation_date:['', Validators.required],
    building_area: ['', Validators.required],
    building_meter_price: ['', Validators.required],
    land_meter_price: ['', Validators.required],
    building_status:['', Validators.required],
    unit_number_apartments:['', Validators.required],
    telephone_service:['', Validators.required],
    electricity_service:['', Validators.required],
    sanitation_service:['', Validators.required],
    water_service:['', Validators.required],
    aqar_age:['', Validators.required],
  });
}

// tslint:disable-next-line:typedef
submitFormAqar() {
  this.ReportService.addLand(this.LandForm.value ).subscribe(res => {
    console.log('Issue added!');
    this.ngOnInit();
   // this.ngZone.run(() => this.router.navigateByUrl('/aqar/offers'));
  });
  this.modalService.dismissAll(); //dismiss the modal
}
Onsubmit() {
  this.ReportService.addLand( this.AqarForm.value ).subscribe(res => {
    console.log('Issue added!');
    this.ngOnInit();
   // this.ngZone.run(() => this.router.navigateByUrl('/aqar/offers'));
  });
  this.modalService.dismissAll(); //dismiss the modal
}

DeleteAqar( aqar_id: number,aqar_type:number) {
  this.ReportService.deleteAaqar(aqar_id,aqar_type).subscribe(
    res => {
      Swal.fire({
        text:   'تم الحذف بنجاح',
        icon: 'success'
      });
      this.ngOnInit();
    },
    err => { console.log(err); 
    });
}

editItem(userModel: aqarReport) {
  const ref = this.modalService.open(EditReportComponent, { centered: true });
  ref.componentInstance.selectedAqar = userModel;
  ref.result.then((yes) => {
    console.log('Yes Click');
    this.ngOnInit();
  },
    (cancel) => {
      console.log('Cancel Click');

    });
}
editItemAqar(userModel: aqarReport) {
  const ref = this.modalService.open(EditAqarComponent, { centered: true });
  ref.componentInstance.selectedAqar = userModel;
  ref.result.then((yes) => {
    console.log('Yes Click');
    this.ngOnInit();
  },
    (cancel) => {
      console.log('Cancel Click');

    });
}
viewDetails(userModel: aqarReport) {
  const ref = this.modalService.open(DetailsReportComponent, { centered: true });
  ref.componentInstance.oneRow = userModel;

  ref.result.then((yes) => {
    console.log('Yes Click');
    this.ngOnInit();
  },
    (cancel) => {
      console.log('Cancel Click');

    });
}
viewDetailsAqar(userModel: aqarReport) {
  const ref = this.modalService.open(ViewDetailsAqarComponent, { centered: true });
  ref.componentInstance.oneRow = userModel;

  ref.result.then((yes) => {
    console.log('Yes Click');
    this.ngOnInit();
  },
    (cancel) => {
      console.log('Cancel Click');

    });
}
}
