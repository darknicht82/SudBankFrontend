import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R05MainComponent } from './r05-main.component';

describe('R05MainComponent', () => {
  let component: R05MainComponent;
  let fixture: ComponentFixture<R05MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R05MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R05MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
