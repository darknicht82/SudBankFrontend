import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { L01FormComponent } from './l01-form.component';

describe('L01FormComponent', () => {
  let component: L01FormComponent;
  let fixture: ComponentFixture<L01FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ L01FormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L01FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
