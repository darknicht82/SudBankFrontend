import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L08FormComponent } from './l08-form.component';

describe('L08FormComponent', () => {
  let component: L08FormComponent;
  let fixture: ComponentFixture<L08FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L08FormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L08FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
