import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqarComponent } from './aqar.component';

describe('AqarComponent', () => {
  let component: AqarComponent;
  let fixture: ComponentFixture<AqarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AqarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AqarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
