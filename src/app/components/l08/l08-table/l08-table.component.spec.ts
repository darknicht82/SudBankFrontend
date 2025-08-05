import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L08TableComponent } from './l08-table.component';

describe('L08TableComponent', () => {
  let component: L08TableComponent;
  let fixture: ComponentFixture<L08TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L08TableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L08TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
