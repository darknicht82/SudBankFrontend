import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R22MainComponent } from './r22-main.component';

describe('R22MainComponent', () => {
  let component: R22MainComponent;
  let fixture: ComponentFixture<R22MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R22MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R22MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
