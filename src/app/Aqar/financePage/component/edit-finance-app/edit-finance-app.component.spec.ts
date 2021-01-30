import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinanceAppComponent } from './edit-finance-app.component';

describe('EditFinanceAppComponent', () => {
  let component: EditFinanceAppComponent;
  let fixture: ComponentFixture<EditFinanceAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFinanceAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFinanceAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
