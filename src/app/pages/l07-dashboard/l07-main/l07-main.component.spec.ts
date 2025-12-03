import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L07MainComponent } from './l07-main.component';

describe('L07MainComponent', () => {
  let component: L07MainComponent;
  let fixture: ComponentFixture<L07MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L07MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L07MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
