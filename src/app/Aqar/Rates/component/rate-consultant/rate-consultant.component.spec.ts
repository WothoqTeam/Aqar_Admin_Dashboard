import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateConsultantComponent } from './rate-consultant.component';

describe('RateConsultantComponent', () => {
  let component: RateConsultantComponent;
  let fixture: ComponentFixture<RateConsultantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateConsultantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
