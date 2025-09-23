import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R11MainComponent } from './r11-main.component';

describe('R11MainComponent', () => {
  let component: R11MainComponent;
  let fixture: ComponentFixture<R11MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R11MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R11MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
