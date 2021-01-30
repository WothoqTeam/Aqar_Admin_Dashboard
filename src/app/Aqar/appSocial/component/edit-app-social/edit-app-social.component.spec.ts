import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppSocialComponent } from './edit-app-social.component';

describe('EditAppSocialComponent', () => {
  let component: EditAppSocialComponent;
  let fixture: ComponentFixture<EditAppSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppSocialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
