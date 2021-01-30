import { Component, OnInit } from '@angular/core';
import { Finance } from '../../models/financeModel';
import { FinanceServiceService } from '../../services/finance-service.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  oneRow: Finance;
  public PID: number;
  constructor(private oneService: FinanceServiceService) { }

  ngOnInit(): void {
  }
  private getone(PID) {
    this.oneService.getApptById(PID).subscribe(
      (res: any) => {
      this.oneRow = res.finance_application;
      console.log(this.oneRow);
      },
      err => console.log(err)
    );
  }
}
