import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R20MainComponent } from './r20-main.component';

describe('R20MainComponent', () => {
  let component: R20MainComponent;
  let fixture: ComponentFixture<R20MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R20MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R20MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
