import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBuildComponent } from './details-build.component';

describe('DetailsBuildComponent', () => {
  let component: DetailsBuildComponent;
  let fixture: ComponentFixture<DetailsBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsBuildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
