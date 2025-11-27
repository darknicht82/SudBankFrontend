import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L07ModalFormComponent } from './l07-modal-form.component';

describe('L07ModalFormComponent', () => {
  let component: L07ModalFormComponent;
  let fixture: ComponentFixture<L07ModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L07ModalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L07ModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
