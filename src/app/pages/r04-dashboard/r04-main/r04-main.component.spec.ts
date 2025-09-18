import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R04MainComponent } from './r04-main.component';

describe('R04MainComponent', () => {
  let component: R04MainComponent;
  let fixture: ComponentFixture<R04MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R04MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R04MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
