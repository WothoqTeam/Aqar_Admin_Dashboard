import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { cityModels } from '../../models/cityModel';
import { CityService } from '../../services/city.service';
import { EditCityComponent } from '../edit-city/edit-city.component';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  citiesList: any = [];
  city: cityModels[] = [];
  closeResult: string;
  issueForm: FormGroup;
  private subscription: Subscription[] = [];
  constructor(private allData: CityService,private router: Router,private httpClient: HttpClient,
              private activeRoute: ActivatedRoute,
              private modalService: NgbModal,public fb: FormBuilder) { }

  ngOnInit(): void {
    this.subscription.push(this.allData.getallCities().subscribe(
      (response: any) => {
        this.city = response;
        this.citiesList = response.cities;
        console.log(this.city);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.addCities();
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
addCities() {
    this.issueForm = this.fb.group({
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
  editItem(userModel:cityModels) {
    const ref = this.modalService.open(EditCityComponent, { centered: true });
    ref.componentInstance.selectedcity = userModel;

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
