import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Rates } from '../../models/rateModel';
import { RateService } from '../../services/rate.service';
import { ViewDetailRatesComponent } from '../view-detail-rates/view-detail-rates.component';

@Component({
  selector: 'app-rate-consultant',
  templateUrl: './rate-consultant.component.html',
  styleUrls: ['./rate-consultant.component.css']
})
export class RateConsultantComponent implements OnInit {
  rateList: any = [];
  rates: Rates[] = [];
  private subscription: Subscription[] = [];
  constructor(private offerService: RateService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.subscription.push(this.offerService.getallRates().subscribe(
      (response: any) => {
        this.rates = response;
        this.rateList = response.rates;
        console.log(this.rates);
      },
      (err) => {
        console.log(err);
      }
    ));
  }
  DeleteOffer(rate_id: number) {
    this.offerService.deleteRates(rate_id).subscribe(
      res => {
        this.ngOnInit();
        Swal.fire({
          text:   "تم الحذف بنجاح",
          icon: 'success'
        });
      },
      err => { console.log(err); }
    );
  }
  viewDetails(userModel: Rates) {
    const ref = this.modalService.open(ViewDetailRatesComponent, { centered: true });
    ref.componentInstance.oneRow = userModel;
  
    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');
  
      })
  }
}
