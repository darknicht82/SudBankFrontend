import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L07TableComponent } from './l07-table.component';

describe('L07TableComponent', () => {
  let component: L07TableComponent;
  let fixture: ComponentFixture<L07TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L07TableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L07TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
