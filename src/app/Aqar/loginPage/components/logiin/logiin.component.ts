import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Userinfo } from '../../models/userinfo';
import { LogindataService } from '../../services/logindata.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-logiin',
  templateUrl: './logiin.component.html',
  styleUrls: ['./logiin.component.css']
})
export class LogiinComponent implements OnInit {

user: Userinfo=new Userinfo();
  constructor(private LoginService: LogindataService, private router: Router,
    private userStorage: UserService) { }
  ngOnInit(): void {
  }
  userAuth()
  {
    this.LoginService.userAuth(this.user).subscribe(
      (res: any) => {
        this.LoginService.login(res.admin.access_token);
        this.userStorage.saveUserName(res.admin.name);
        console.log(res.admin.name);
        this.userStorage.saveUserId(res.admin.id);
        console.log(res.admin.id);
        this.router.navigateByUrl('/aqar/Dashboard');
      },
      err=>{console.log(err);
      }
    );
  }
}
