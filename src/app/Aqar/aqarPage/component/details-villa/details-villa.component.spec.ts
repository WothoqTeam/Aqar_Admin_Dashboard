import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVillaComponent } from './details-villa.component';

describe('DetailsVillaComponent', () => {
  let component: DetailsVillaComponent;
  let fixture: ComponentFixture<DetailsVillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsVillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
