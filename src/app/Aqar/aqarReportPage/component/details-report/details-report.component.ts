import { Component, OnInit } from '@angular/core';
import { aqarReport } from '../../models/aqarReport';
import { AqarReportService } from '../../services/aqar-report.service';

@Component({
  selector: 'app-details-report',
  templateUrl: './details-report.component.html',
  styleUrls: ['./details-report.component.css']
})
export class DetailsReportComponent implements OnInit {
  oneRow: aqarReport;
  public PID: number;
  constructor(private oneService: AqarReportService) { }

  ngOnInit(): void {
  }
  private getone(PID) {
    this.oneService.getDetailtById(PID).subscribe(
      (res: any) => {
      this.oneRow = res.data;
      console.log(this.oneRow);
      },
      err => console.log(err)
    );
  }
}
