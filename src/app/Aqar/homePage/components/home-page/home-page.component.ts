import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { homeModel } from '../../models/homeModel';
import { HomeService } from '../../services/home.service';



@Component({
  selector: 'app-home-page',
  templateUrl:'./home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  dashboardList: any = [];
  dashboard: homeModel[] = [];
  oneRow: homeModel =new homeModel();
  public PID: number;
  private subscription: Subscription[] = [];

  constructor(private oneService: HomeService) { }
  
  ngOnInit(): void { 
    this.subscription.push(this.oneService.getalldata().subscribe(
      (response: any) => {
        this.dashboard = response;
        this.dashboardList = response.data;
        console.log(this.dashboard);
      },
      (err) => {
        console.log(err);
      }
    ));
  }
 

}
