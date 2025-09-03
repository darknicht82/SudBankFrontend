import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L02ModalFormComponent } from './l02-modal-form.component';

describe('L02ModalFormComponent', () => {
  let component: L02ModalFormComponent;
  let fixture: ComponentFixture<L02ModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L02ModalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L02ModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
