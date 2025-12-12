import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L06TableComponent } from './l06-table.component';

describe('L06TableComponent', () => {
  let component: L06TableComponent;
  let fixture: ComponentFixture<L06TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L06TableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L06TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
