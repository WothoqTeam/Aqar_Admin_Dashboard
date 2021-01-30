import { Component, OnInit } from '@angular/core';
import { Maintenance } from '../../models/maintenanceModel';
import { MaintenanceService } from '../../services/maintenance.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  oneRow: Maintenance;
  public PID: number;
  constructor(private oneService: MaintenanceService) { }

  ngOnInit(): void {
  }
  private getone(PID) {
    this.oneService.getDetailtById(PID).subscribe(
      (res: any) => {
      this.oneRow = res.maintenance;
      console.log(this.oneRow);
      },
      err => console.log(err)
    );
  }
}
