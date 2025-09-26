import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R12MainComponent } from './r12-main.component';

describe('R12MainComponent', () => {
  let component: R12MainComponent;
  let fixture: ComponentFixture<R12MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R12MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R12MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
