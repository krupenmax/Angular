import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepbackComponent } from './stepback.component';

describe('StepbackComponent', () => {
  let component: StepbackComponent;
  let fixture: ComponentFixture<StepbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
