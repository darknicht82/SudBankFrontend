import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L08HistoricoComponent } from './l08-historico.component';

describe('L08HistoricoComponent', () => {
  let component: L08HistoricoComponent;
  let fixture: ComponentFixture<L08HistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L08HistoricoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L08HistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
