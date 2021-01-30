import { Component, OnInit } from '@angular/core';
import { aqarReport } from '../../models/aqarReport';
import { AqarReportService } from '../../services/aqar-report.service';

@Component({
  selector: 'app-view-details-aqar',
  templateUrl: './view-details-aqar.component.html',
  styleUrls: ['./view-details-aqar.component.css']
})
export class ViewDetailsAqarComponent implements OnInit {
  oneRow: aqarReport;
  public PID: number;
  constructor(private oneService: AqarReportService) { }

  ngOnInit(): void {
  }
  private getone(PID) {
    this.oneService.getDetailtByIdAqar(PID).subscribe(
      (res: any) => {
      this.oneRow = res.data;
      console.log(this.oneRow);
      },
      err => console.log(err)
    );
  }

}
