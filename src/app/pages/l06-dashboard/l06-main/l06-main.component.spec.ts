import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L06MainComponent } from './l06-main.component';

describe('L06MainComponent', () => {
  let component: L06MainComponent;
  let fixture: ComponentFixture<L06MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L06MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L06MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
