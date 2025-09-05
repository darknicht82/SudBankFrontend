import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L02MainComponent } from './l02-main.component';

describe('L02MainComponent', () => {
  let component: L02MainComponent;
  let fixture: ComponentFixture<L02MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L02MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L02MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
