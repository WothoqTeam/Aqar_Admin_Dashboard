import { Component, OnInit } from '@angular/core';
import { aqarModel } from '../../models/aqarModels';
import { AqarService } from '../../services/aqar.service';

@Component({
  selector: 'app-details-villa',
  templateUrl: './details-villa.component.html',
  styleUrls: ['./details-villa.component.css']
})
export class DetailsVillaComponent implements OnInit {

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
