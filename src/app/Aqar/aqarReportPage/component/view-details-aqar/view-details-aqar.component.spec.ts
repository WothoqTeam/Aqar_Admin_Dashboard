import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsAqarComponent } from './view-details-aqar.component';

describe('ViewDetailsAqarComponent', () => {
  let component: ViewDetailsAqarComponent;
  let fixture: ComponentFixture<ViewDetailsAqarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailsAqarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsAqarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
