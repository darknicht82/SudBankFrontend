import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L08AuditoriaComponent } from './l08-auditoria.component';

describe('L08AuditoriaComponent', () => {
  let component: L08AuditoriaComponent;
  let fixture: ComponentFixture<L08AuditoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L08AuditoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L08AuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
