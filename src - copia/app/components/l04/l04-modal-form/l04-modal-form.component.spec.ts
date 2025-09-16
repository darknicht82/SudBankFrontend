import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L04ModalFormComponent } from './l04-modal-form.component';

describe('L04ModalFormComponent', () => {
  let component: L04ModalFormComponent;
  let fixture: ComponentFixture<L04ModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L04ModalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L04ModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
