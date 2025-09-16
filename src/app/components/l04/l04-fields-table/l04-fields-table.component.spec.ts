import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L04FieldsTableComponent } from './l04-fields-table.component';

describe('L04FieldsTableComponent', () => {
  let component: L04FieldsTableComponent;
  let fixture: ComponentFixture<L04FieldsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L04FieldsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L04FieldsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
