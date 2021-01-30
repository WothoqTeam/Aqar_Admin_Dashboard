import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { EditAqarComponent } from 'src/app/Aqar/aqarReportPage/component/edit-aqar/edit-aqar.component';
import { cityModels } from 'src/app/Aqar/city/models/cityModel';
import { CityService } from 'src/app/Aqar/city/services/city.service';
import { districtModel } from 'src/app/Aqar/district/models/districtModel';
import { DistrictService } from 'src/app/Aqar/district/services/district.service';
import { User } from 'src/app/Aqar/usersPage/models/userModel';
import { UserService } from 'src/app/Aqar/usersPage/services/user.service';
import Swal from 'sweetalert2';
import { aqarModel } from '../../models/aqarModels';
import { AqarService } from '../../services/aqar.service';
import { DetailsBuildComponent } from '../details-build/details-build.component';
import { DetailsFlatComponent } from '../details-flat/details-flat.component';
import { DetailsLandComponent } from '../details-land/details-land.component';
import { DetailsVillaComponent } from '../details-villa/details-villa.component';
import { EditBuildComponent } from '../edit-build/edit-build.component';
import { EditFlatComponent } from '../edit-flat/edit-flat.component';
import { EditLandComponent } from '../edit-land/edit-land.component';
import { EditVillaComponent } from '../edit-villa/edit-villa.component';

@Component({
  selector: 'app-aqar',
  templateUrl: './aqar.component.html',
  styleUrls: ['./aqar.component.css']
})
export class AqarComponent implements OnInit {
  aqarListflat: any = [];
  aqarFlat: aqarModel[] = [];

  aqarListLand: any = [];
  aqarLand: aqarModel[] = [];
 
  aqarListvilla: any = [];
  aqarVilla: aqarModel[] = [];
 
  aqarListbuild: any = [];
  aqarBuild: aqarModel[] = [];
  private subscription: Subscription[] = [];

  cityList: any = [];
  city: cityModels [] = [];
 
  districtList: any = [];
  district: districtModel [] = [];
  arrayOfImages = [];
  closeResult: string;
  consForm: FormGroup;
  userList: any = [];
  user: User[] = [];
  AqarForm:FormGroup;
  villaForm:FormGroup;
  flatForm:FormGroup;
  readonly cat = 'http://aqar.wothoq.co/api/admin/aqar/store';
  constructor(private ReportService: AqarService,private modalService: NgbModal, public fb: FormBuilder,private userservice: UserService,
              private cityService: CityService,private districtservice: DistrictService,private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.aqarland();
    this.aqarflat();
    this.aqarvilla();
    this.aqarbuild();

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
    this.subscription.push(this.userservice.getalluser().subscribe(
      (response: any) => {
        this.user = response;
        this.userList = response.users;
        console.log(this.user);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.addAqar();
    this.addAqarBuild();
    this.addAqarVilla();
    this.addAqarFlat();
  }
  aqarland(){
    this.subscription.push(this.ReportService.getallAqars(0).subscribe(
      (response: any) => {
        this.aqarLand = response;
        this.aqarListLand = response.data;
        console.log(this.aqarLand);
      },
      (err) => {
        console.log(err);
      }
    ));
  }
  aqarflat(){
    this.subscription.push(this.ReportService.getallAqars(1).subscribe(
      (response: any) => {
        this.aqarFlat = response;
        this.aqarListflat = response.data;
        console.log(this.aqarFlat);
      },
      (err) => {
        console.log(err);
      }
    ));
  }
  aqarvilla(){
    this.subscription.push(this.ReportService.getallAqars(2).subscribe(
      (response: any) => {
        this.aqarVilla = response;
        this.aqarListvilla = response.data;
        console.log(this.aqarVilla);
      },
      (err) => {
        console.log(err);
      }
    ));
  }
  aqarbuild(){
    this.subscription.push(this.ReportService.getallAqars(3).subscribe(
      (response: any) => {
        this.aqarBuild = response;
        this.aqarListbuild = response.data;
        console.log(this.aqarBuild);
      },
      (err) => {
        console.log(err);
      }
    ));
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
  addAqar() {
    this.consForm = this.fb.group({
      city: ['', Validators.required],
      district:['', Validators.required],
      suk_number:['', Validators.required],
      suk_date:['', Validators.required],
      photos: [],
      address:['', Validators.required],
      longitude:['', Validators.required],
      latitude:['', Validators.required],
      area:['', Validators.required],
      benefits_nearby:['', Validators.required],
      interfaces_number:['', Validators.required],
      meter_price:['', Validators.required],
      street_type:['', Validators.required],
      street_name:['', Validators.required],
      street_view:['', Validators.required],
      aqar_type:['', Validators.required],
      user_id:['', Validators.required],
    });
  }
  // tslint:disable-next-line:typedef 
  onSubmit() {
    const uploadData = new FormData() ;
    console.log(this.consForm);

    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.consForm.get('photos').value.length; index++) {
      uploadData.append('photos[]', this.consForm.get('photos').value[index]);
    }
    uploadData.append('city', this.consForm.get('city').value);
    uploadData.append('district', this.consForm.get('district').value);
    uploadData.append('suk_number', this.consForm.get('suk_number').value);
    uploadData.append('suk_date', this.consForm.get('suk_date').value);
    uploadData.append('address', this.consForm.get('address').value);
    uploadData.append('longitude', this.consForm.get('longitude').value);
    uploadData.append('latitude', this.consForm.get('latitude').value);
    uploadData.append('area', this.consForm.get('area').value);
    uploadData.append('benefits_nearby', this.consForm.get('benefits_nearby').value);
    uploadData.append('interfaces_number', this.consForm.get('interfaces_number').value);
    uploadData.append('meter_price', this.consForm.get('meter_price').value);
    uploadData.append('street_type', this.consForm.get('street_type').value);
    uploadData.append('street_name', this.consForm.get('street_name').value);
    uploadData.append('street_view', this.consForm.get('street_view').value);
    uploadData.append('aqar_type', this.consForm.get('aqar_type').value);
    uploadData.append('user_id', this.consForm.get('user_id').value);
  
    console.log(uploadData);
    this.httpClient.post(this.cat, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
        this.ngOnInit();
      });
    this.modalService.dismissAll();
  }
  onFileChanged(event) {
    console.log(event.target.files);
    if (event.target.files && event.target.files) {
      const reader = new FileReader();
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < event.target.files.length; index++) {
        console.log(event.target.files[index]);
        this.arrayOfImages.push(event.target.files[index]);
      }
      this.consForm.get('photos').setValue(this.arrayOfImages);
      console.log('pic', this.consForm.get('photos'));
      reader.readAsDataURL(event.target.files[0]);
    }

  }
  addAqarBuild(){
    this.AqarForm = this.fb.group({
      aqar_type: ['', Validators.required],
      street_asphalt_type: ['',Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      suk_number: ['', Validators.required],
      suk_date: ['', Validators.required],
      address:['', Validators.required],
      longitude: ['', Validators.required],
      latitude:['', Validators.required],
      land_area: ['', Validators.required],
      benefits_nearby: ['', Validators.required],
      interfaces_number: ['', Validators.required],
      price: ['', Validators.required],
      street_name: ['', Validators.required],
      floors_number: ['', Validators.required],
      driver_room_number: ['', Validators.required],
      garage_floor: ['', Validators.required],
      building_area: ['', Validators.required],
      apartments_number: ['', Validators.required],
      street_type: ['', Validators.required],

    });
  }
  Onsubmit() {
    this.ReportService.addLand( this.AqarForm.value ).subscribe(res => {
      console.log('Issue added!');
      this.ngOnInit();
     // this.ngZone.run(() => this.router.navigateByUrl('/aqar/offers'));
    });
    this.modalService.dismissAll(); //dismiss the modal
  }
  addAqarVilla() {
    this.villaForm = this.fb.group({
      city: ['', Validators.required],
      district:['', Validators.required],
      suk_number:['', Validators.required],
      suk_date:['', Validators.required],
      photos: [],
      address:['', Validators.required],
      longitude:['', Validators.required],
      latitude:['', Validators.required],
      land_area:['', Validators.required],
      benefits_nearby:['', Validators.required],
      interfaces_number:['', Validators.required],
      price:['', Validators.required],
      street_type:['', Validators.required],
      street_name:['', Validators.required],
      floors_number:['', Validators.required],
      bedrooms:['', Validators.required],
      bathrooms:['', Validators.required],
      halls_number:['', Validators.required],
      session_rooms:['', Validators.required],
      kitchens:['', Validators.required],
      maid_room:['', Validators.required],
      driver_room:['', Validators.required],
      indoor_parking:['', Validators.required],
      aqar_type:['', Validators.required],
      building_area:['', Validators.required],
      finishing_type:['', Validators.required],
      construction_status:['', Validators.required],
      user_id:['',Validators.required],
      
    });
  }
  // tslint:disable-next-line:adjacent-overload-signatures
  onFileChanged1(event) {
    console.log(event.target.files);
    if (event.target.files && event.target.files) {
      const reader = new FileReader();
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < event.target.files.length; index++) {
        console.log(event.target.files[index]);
        this.arrayOfImages.push(event.target.files[index]);
      }
      this.villaForm.get('photos').setValue(this.arrayOfImages);
      console.log('pic', this.villaForm.get('photos'));
      reader.readAsDataURL(event.target.files[0]);
    }

  }
  onSubmitVilla() {
    const uploadData = new FormData() ;
    console.log(this.consForm);

    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.villaForm.get('photos').value.length; index++) {
      uploadData.append('photos[]', this.villaForm.get('photos').value[index]);
    }
    uploadData.append('city', this.villaForm.get('city').value);
    uploadData.append('district', this.villaForm.get('district').value);
    uploadData.append('suk_number', this.villaForm.get('suk_number').value);
    uploadData.append('suk_date', this.villaForm.get('suk_date').value);
    uploadData.append('address', this.villaForm.get('address').value);
    uploadData.append('longitude', this.villaForm.get('longitude').value);
    uploadData.append('latitude', this.villaForm.get('latitude').value);
    uploadData.append('land_area', this.villaForm.get('land_area').value);
    uploadData.append('benefits_nearby', this.villaForm.get('benefits_nearby').value);
    uploadData.append('interfaces_number', this.villaForm.get('interfaces_number').value);
    uploadData.append('price', this.villaForm.get('price').value);
    uploadData.append('street_type', this.villaForm.get('street_type').value);
    uploadData.append('street_name', this.villaForm.get('street_name').value);
    uploadData.append('floors_number', this.villaForm.get('floors_number').value);
    uploadData.append('aqar_type', this.villaForm.get('aqar_type').value);
    uploadData.append('bedrooms', this.villaForm.get('bedrooms').value);
    uploadData.append('bathrooms', this.villaForm.get('bathrooms').value);
    uploadData.append('halls_number', this.villaForm.get('halls_number').value);
    uploadData.append('session_rooms', this.villaForm.get('session_rooms').value);
    uploadData.append('kitchens', this.villaForm.get('kitchens').value);
    uploadData.append('maid_room', this.villaForm.get('maid_room').value);
    uploadData.append('driver_room', this.villaForm.get('driver_room').value);
    uploadData.append('indoor_parking', this.villaForm.get('indoor_parking').value);
    uploadData.append('building_area', this.villaForm.get('building_area').value);
    uploadData.append('finishing_type', this.villaForm.get('finishing_type').value);
    uploadData.append('construction_status', this.villaForm.get('construction_status').value);
    uploadData.append('user_id', this.villaForm.get('user_id').value);

    console.log(uploadData);
    this.httpClient.post(this.cat, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
        this.ngOnInit();
      });
    this.modalService.dismissAll();
  }

  addAqarFlat() {
    this.flatForm = this.fb.group({
      city: ['', Validators.required],
      district:['', Validators.required],
      suk_number:['', Validators.required],
      suk_date:['', Validators.required],
      photos: [],
      address:['', Validators.required],
      longitude:['', Validators.required],
      latitude:['', Validators.required],
      land_area:['', Validators.required],
      benefits_nearby:['', Validators.required],
      interfaces_number:['', Validators.required],
      price:['', Validators.required],
      street_type:['', Validators.required],
      street_name:['', Validators.required],
      floors_number:['', Validators.required],
      bedrooms:['', Validators.required],
      bathrooms:['', Validators.required],
      halls_number:['', Validators.required],
      session_rooms:['', Validators.required],
      kitchens:['', Validators.required],
      maid_room:['', Validators.required],
      driver_room:['', Validators.required],
      indoor_parking:['', Validators.required],
      aqar_type:['', Validators.required],
      building_area:['', Validators.required],
      finishing_type:['', Validators.required],
      construction_status:['', Validators.required],
      user_id:['', Validators.required],
    });
  }
  // tslint:disable-next-line:adjacent-overload-signatures
  onFileChanged2(event) {
    console.log(event.target.files);
    if (event.target.files && event.target.files) {
      const reader = new FileReader();
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < event.target.files.length; index++) {
        console.log(event.target.files[index]);
        this.arrayOfImages.push(event.target.files[index]);
      }
      this.flatForm.get('photos').setValue(this.arrayOfImages);
      console.log('pic', this.flatForm.get('photos'));
      reader.readAsDataURL(event.target.files[0]);
    }

  }
  onSubmitFlat() {
    const uploadData = new FormData() ;
    console.log(this.consForm);

    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.flatForm.get('photos').value.length; index++) {
      uploadData.append('photos[]', this.flatForm.get('photos').value[index]);
    }
    uploadData.append('city', this.flatForm.get('city').value);
    uploadData.append('district', this.flatForm.get('district').value);
    uploadData.append('suk_number', this.flatForm.get('suk_number').value);
    uploadData.append('suk_date', this.flatForm.get('suk_date').value);
    uploadData.append('address', this.flatForm.get('address').value);
    uploadData.append('longitude', this.flatForm.get('longitude').value);
    uploadData.append('latitude', this.flatForm.get('latitude').value);
    uploadData.append('land_area', this.flatForm.get('land_area').value);
    uploadData.append('benefits_nearby', this.flatForm.get('benefits_nearby').value);
    uploadData.append('interfaces_number', this.flatForm.get('interfaces_number').value);
    uploadData.append('price', this.flatForm.get('price').value);
    uploadData.append('street_type', this.flatForm.get('street_type').value);
    uploadData.append('street_name', this.flatForm.get('street_name').value);
    uploadData.append('floors_number', this.flatForm.get('floors_number').value);
    uploadData.append('aqar_type', this.flatForm.get('aqar_type').value);
    uploadData.append('bedrooms', this.flatForm.get('bedrooms').value);
    uploadData.append('bathrooms', this.flatForm.get('bathrooms').value);
    uploadData.append('halls_number', this.flatForm.get('halls_number').value);
    uploadData.append('session_rooms', this.flatForm.get('session_rooms').value);
    uploadData.append('kitchens', this.flatForm.get('kitchens').value);
    uploadData.append('maid_room', this.flatForm.get('floors_number').value);
    uploadData.append('driver_room', this.flatForm.get('driver_room').value);
    uploadData.append('indoor_parking', this.flatForm.get('indoor_parking').value);
    uploadData.append('building_area', this.flatForm.get('building_area').value);
    uploadData.append('finishing_type', this.flatForm.get('finishing_type').value);
    uploadData.append('construction_status', this.flatForm.get('construction_status').value);
    uploadData.append('user_id', this.flatForm.get('user_id').value);

    console.log(uploadData);
    this.httpClient.post(this.cat, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
        this.ngOnInit();
      });
    this.modalService.dismissAll();
  }

viewDetailsLand(userModel: aqarModel) {
    const ref = this.modalService.open(DetailsLandComponent, { centered: true });
    ref.componentInstance.oneRow = userModel;
  
    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');
  
      });
  }
viewDetailsVilla(userModel: aqarModel) {
    const ref = this.modalService.open(DetailsVillaComponent, { centered: true });
    ref.componentInstance.oneRow = userModel;
  
    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');
  
      });
  }
  viewDetailsFlat(userModel: aqarModel) {
    const ref = this.modalService.open(DetailsFlatComponent, { centered: true });
    ref.componentInstance.oneRow = userModel;
  
    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');
  
      });
  }
  viewDetailsBuild(userModel: aqarModel) {
    const ref = this.modalService.open(DetailsBuildComponent, { centered: true });
    ref.componentInstance.oneRow = userModel;
  
    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');
  
      });
  }

  editItemland1(userModel: aqarModel) {
    const ref = this.modalService.open(EditLandComponent, { centered: true });
    ref.componentInstance.selectedAqar = userModel;
    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');
  
      });
  }

  editItemVilla(userModel: aqarModel) {
    const ref = this.modalService.open(EditVillaComponent, { centered: true });
    ref.componentInstance.selectedAqar = userModel;
    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');
  
      });
  }
  editItemBuild(userModel: aqarModel) {
    const ref = this.modalService.open(EditBuildComponent, { centered: true });
    ref.componentInstance.selectedAqar = userModel;
    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');
  
      });
  }
  editItemFlat(userModel: aqarModel) {
    const ref = this.modalService.open(EditFlatComponent, { centered: true });
    ref.componentInstance.selectedAqar = userModel;
    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');
  
      });
  }
}
