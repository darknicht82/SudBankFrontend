import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L01ValidateComponent } from './l01-validate.component';

describe('L01ValidateComponent', () => {
  let component: L01ValidateComponent;
  let fixture: ComponentFixture<L01ValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ L01ValidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L01ValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
