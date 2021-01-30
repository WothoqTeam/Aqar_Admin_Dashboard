import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { appSocial } from '../../models/appSocialModel';
import { AppSocialService } from '../../services/app-social.service';

@Component({
  selector: 'app-edit-app-social',
  templateUrl: './edit-app-social.component.html',
  styleUrls: ['./edit-app-social.component.css']
})
export class EditAppSocialComponent implements OnInit {
  selectedApp:appSocial;
  editForm: FormGroup;
  isLoading = false;
  private subscription: Subscription[] = [];
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,
              private usersService: AppSocialService,private httpClient: HttpClient,
              private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.setForm();
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
      social_id: [this.selectedApp.id, Validators.required],
      name: [this.selectedApp.name, Validators.required],
      link: [this.selectedApp.link, Validators.required],
    });

  }
}
