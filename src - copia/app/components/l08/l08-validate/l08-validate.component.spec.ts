import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L08ValidateComponent } from './l08-validate.component';

describe('L08ValidateComponent', () => {
  let component: L08ValidateComponent;
  let fixture: ComponentFixture<L08ValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L08ValidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L08ValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
