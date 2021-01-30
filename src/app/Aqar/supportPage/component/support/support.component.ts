import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Support } from '../../models/supportModel';
import { SupportService } from '../../services/support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  supportist: any = [];
  support: Support[] = [];
  private subscription: Subscription[] = [];
  
  constructor(private supportservice:SupportService) { }

  ngOnInit(): void {
    this.subscription.push(this.supportservice.getAllsupport().subscribe(
      (response: any) => {
        this.support = response;
        this.supportist = response.contacts;
        console.log(this.support);
      },
      (err) => {
        console.log(err);
      }
    ));
  }

}
