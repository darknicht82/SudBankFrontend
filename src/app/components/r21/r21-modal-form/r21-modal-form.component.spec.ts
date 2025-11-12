import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R21ModalFormComponent } from './r21-modal-form.component';

describe('R21ModalFormComponent', () => {
  let component: R21ModalFormComponent;
  let fixture: ComponentFixture<R21ModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R21ModalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R21ModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
