import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferComponentComponent } from './offer-component.component';

describe('OfferComponentComponent', () => {
  let component: OfferComponentComponent;
  let fixture: ComponentFixture<OfferComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
