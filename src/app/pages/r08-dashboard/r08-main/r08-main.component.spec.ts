import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R08MainComponent } from './r08-main.component';

describe('R08MainComponent', () => {
  let component: R08MainComponent;
  let fixture: ComponentFixture<R08MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R08MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R08MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
