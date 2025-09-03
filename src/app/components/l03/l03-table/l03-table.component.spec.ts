import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L03TableComponent } from './l03-table.component';

describe('L03TableComponent', () => {
  let component: L03TableComponent;
  let fixture: ComponentFixture<L03TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L03TableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L03TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
