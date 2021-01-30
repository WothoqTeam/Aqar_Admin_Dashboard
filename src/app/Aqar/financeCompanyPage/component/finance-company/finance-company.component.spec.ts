import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceCompanyComponent } from './finance-company.component';

describe('FinanceCompanyComponent', () => {
  let component: FinanceCompanyComponent;
  let fixture: ComponentFixture<FinanceCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
