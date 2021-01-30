import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqarReportComponent } from './aqar-report.component';

describe('AqarReportComponent', () => {
  let component: AqarReportComponent;
  let fixture: ComponentFixture<AqarReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AqarReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AqarReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
