import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppSetting } from '../../models/appSettingModel';
import { AppsettingService } from '../../services/appsetting.service';

@Component({
  selector: 'app-edit-app-setting',
  templateUrl: './edit-app-setting.component.html',
  styleUrls: ['./edit-app-setting.component.css']
})
export class EditAppSettingComponent implements OnInit {
  selectedApp:AppSetting;
  editForm: FormGroup;
  isLoading = false;
  private subscription: Subscription[] = [];
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,
              private usersService: AppsettingService,private httpClient: HttpClient,
              private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {    this.setForm();

  }
  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.usersService.UpdateApp(this.editForm.value).subscribe(x => {
      this.isLoading = false;
      this.modal.close('Yes');

    },
      error => {
        this.isLoading = false;
      });
  }
  get editFormData() { return this.editForm.controls; }
  private setForm() {
    console.log(this.selectedApp);
    this.editForm = this.formBuilder.group({
      setting_id: [this.selectedApp.id, Validators.required],
      app_name: [this.selectedApp.app_name, Validators.required],
      app_version:[this.selectedApp.app_version, Validators.required],
     
    });

  }
}
