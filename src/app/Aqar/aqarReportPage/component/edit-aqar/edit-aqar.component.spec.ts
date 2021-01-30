import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAqarComponent } from './edit-aqar.component';

describe('EditAqarComponent', () => {
  let component: EditAqarComponent;
  let fixture: ComponentFixture<EditAqarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAqarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAqarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
