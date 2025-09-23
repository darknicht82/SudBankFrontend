import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R13MainComponent } from './r13-main.component';

describe('R13MainComponent', () => {
  let component: R13MainComponent;
  let fixture: ComponentFixture<R13MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R13MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R13MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
