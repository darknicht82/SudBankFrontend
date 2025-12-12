import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L06ModalFormComponent } from './l06-modal-form.component';

describe('L06ModalFormComponent', () => {
  let component: L06ModalFormComponent;
  let fixture: ComponentFixture<L06ModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L06ModalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L06ModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
