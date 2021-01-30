import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/Aqar/financeCompanyPage/models/companyModel';
import { Consultant } from '../../models/consultant';
import { ConsultantServiceService } from '../../services/consultant-service.service';

@Component({
  selector: 'app-details-consultant',
  templateUrl: './details-consultant.component.html',
  styleUrls: ['./details-consultant.component.css']
})
export class DetailsConsultantComponent implements OnInit {
  oneRow: Consultant;
  public PID: number;
  constructor(private oneService: ConsultantServiceService) { }

  ngOnInit(): void {
  }
  private getone(PID) {
    this.oneService.getConsultantById(PID).subscribe(
      (res: any) => {
      this.oneRow = res.consultant;
      console.log(this.oneRow);
      },
      err => console.log(err)
    );
  }
}
