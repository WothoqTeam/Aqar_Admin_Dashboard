import { Component, OnInit } from '@angular/core';
import { aqarModel } from '../../models/aqarModels';
import { AqarService } from '../../services/aqar.service';

@Component({
  selector: 'app-details-flat',
  templateUrl: './details-flat.component.html',
  styleUrls: ['./details-flat.component.css']
})
export class DetailsFlatComponent implements OnInit {

  oneRow: aqarModel;
  public PID: number;
  constructor(private oneService: AqarService) { }

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
