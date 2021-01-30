import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVillaComponent } from './edit-villa.component';

describe('EditVillaComponent', () => {
  let component: EditVillaComponent;
  let fixture: ComponentFixture<EditVillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
