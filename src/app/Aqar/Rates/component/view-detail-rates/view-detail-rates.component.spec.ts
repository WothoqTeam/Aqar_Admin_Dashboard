import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailRatesComponent } from './view-detail-rates.component';

describe('ViewDetailRatesComponent', () => {
  let component: ViewDetailRatesComponent;
  let fixture: ComponentFixture<ViewDetailRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
