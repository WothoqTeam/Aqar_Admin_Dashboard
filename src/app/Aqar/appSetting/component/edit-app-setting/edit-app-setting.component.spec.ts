import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppSettingComponent } from './edit-app-setting.component';

describe('EditAppSettingComponent', () => {
  let component: EditAppSettingComponent;
  let fixture: ComponentFixture<EditAppSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
