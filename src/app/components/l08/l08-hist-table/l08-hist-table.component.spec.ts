import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L08HistTableComponent } from './l08-hist-table.component';

describe('L08HistTableComponent', () => {
  let component: L08HistTableComponent;
  let fixture: ComponentFixture<L08HistTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L08HistTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L08HistTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
