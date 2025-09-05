import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L08CompararComponent } from './l08-comparar.component';

describe('L08CompararComponent', () => {
  let component: L08CompararComponent;
  let fixture: ComponentFixture<L08CompararComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L08CompararComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L08CompararComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
