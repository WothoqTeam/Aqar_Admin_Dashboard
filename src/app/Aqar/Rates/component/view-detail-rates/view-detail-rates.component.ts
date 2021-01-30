import { Component, OnInit } from '@angular/core';
import { Rates } from '../../models/rateModel';
import { RateService } from '../../services/rate.service';

@Component({
  selector: 'app-view-detail-rates',
  templateUrl: './view-detail-rates.component.html',
  styleUrls: ['./view-detail-rates.component.css']
})
export class ViewDetailRatesComponent implements OnInit {
  oneRow: Rates;
  public PID: number;
  constructor(private oneService: RateService) { }

  ngOnInit(): void {
  }
  private getone(PID) {
    this.oneService.getDetailtById(PID).subscribe(
      (res: any) => {
      this.oneRow = res.rate;
      console.log(this.oneRow);
      },
      err => console.log(err)
    );
  }

}
