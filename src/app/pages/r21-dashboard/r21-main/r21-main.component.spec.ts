import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R21MainComponent } from './r21-main.component';

describe('R21MainComponent', () => {
  let component: R21MainComponent;
  let fixture: ComponentFixture<R21MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R21MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R21MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
