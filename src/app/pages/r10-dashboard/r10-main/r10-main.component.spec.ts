import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R10MainComponent } from './r10-main.component';

describe('R10MainComponent', () => {
  let component: R10MainComponent;
  let fixture: ComponentFixture<R10MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R10MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R10MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
