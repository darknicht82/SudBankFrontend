import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L03MainComponent } from './l03-main.component';

describe('L03MainComponent', () => {
  let component: L03MainComponent;
  let fixture: ComponentFixture<L03MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L03MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L03MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
