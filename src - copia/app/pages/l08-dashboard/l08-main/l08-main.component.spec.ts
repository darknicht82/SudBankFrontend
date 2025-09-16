import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L08MainComponent } from './l08-main.component';

describe('L08MainComponent', () => {
  let component: L08MainComponent;
  let fixture: ComponentFixture<L08MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L08MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L08MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
