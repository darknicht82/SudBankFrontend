import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R02MainComponent } from './r02-main.component';

describe('R02MainComponent', () => {
  let component: R02MainComponent;
  let fixture: ComponentFixture<R02MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R02MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R02MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
