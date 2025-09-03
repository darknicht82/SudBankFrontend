import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L04MainComponent } from './l04-main.component';

describe('L04MainComponent', () => {
  let component: L04MainComponent;
  let fixture: ComponentFixture<L04MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L04MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L04MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
