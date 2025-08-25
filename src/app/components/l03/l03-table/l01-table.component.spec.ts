import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L01TableComponent } from './l03-table.component';

describe('L01TableComponent', () => {
  let component: L01TableComponent;
  let fixture: ComponentFixture<L01TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ L01TableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L01TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
