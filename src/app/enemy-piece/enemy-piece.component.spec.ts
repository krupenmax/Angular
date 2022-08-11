import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyPieceComponent } from './enemy-piece.component';

describe('EnemyPieceComponent', () => {
  let component: EnemyPieceComponent;
  let fixture: ComponentFixture<EnemyPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnemyPieceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnemyPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
