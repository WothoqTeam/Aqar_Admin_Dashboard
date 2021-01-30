import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLandComponent } from './details-land.component';

describe('DetailsLandComponent', () => {
  let component: DetailsLandComponent;
  let fixture: ComponentFixture<DetailsLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsLandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
