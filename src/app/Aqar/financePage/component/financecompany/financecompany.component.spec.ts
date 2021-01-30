import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancecompanyComponent } from './financecompany.component';

describe('FinancecompanyComponent', () => {
  let component: FinancecompanyComponent;
  let fixture: ComponentFixture<FinancecompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancecompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancecompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
