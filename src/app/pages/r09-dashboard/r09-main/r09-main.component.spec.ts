import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R09MainComponent } from './r09-main.component';

describe('R09MainComponent', () => {
  let component: R09MainComponent;
  let fixture: ComponentFixture<R09MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R09MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R09MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
