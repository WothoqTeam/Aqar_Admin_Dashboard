import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantuserComponent } from './consultantuser.component';

describe('ConsultantuserComponent', () => {
  let component: ConsultantuserComponent;
  let fixture: ComponentFixture<ConsultantuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
