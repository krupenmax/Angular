import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoseWindowComponent } from './lose-window.component';

describe('LoseWindowComponent', () => {
  let component: LoseWindowComponent;
  let fixture: ComponentFixture<LoseWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoseWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoseWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
