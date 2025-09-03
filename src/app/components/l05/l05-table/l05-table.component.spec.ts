import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L05TableComponent } from './l05-table.component';

describe('L05TableComponent', () => {
  let component: L05TableComponent;
  let fixture: ComponentFixture<L05TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L05TableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L05TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
