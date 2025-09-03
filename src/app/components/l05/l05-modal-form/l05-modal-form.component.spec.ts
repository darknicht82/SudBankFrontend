import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L05ModalFormComponent } from './l05-modal-form.component';

describe('L05ModalFormComponent', () => {
  let component: L05ModalFormComponent;
  let fixture: ComponentFixture<L05ModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L05ModalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L05ModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
