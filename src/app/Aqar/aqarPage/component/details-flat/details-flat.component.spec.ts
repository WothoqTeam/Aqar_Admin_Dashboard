import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFlatComponent } from './details-flat.component';

describe('DetailsFlatComponent', () => {
  let component: DetailsFlatComponent;
  let fixture: ComponentFixture<DetailsFlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsFlatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
