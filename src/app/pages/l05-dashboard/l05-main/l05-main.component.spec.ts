import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L05MainComponent } from './l05-main.component';

describe('L05MainComponent', () => {
  let component: L05MainComponent;
  let fixture: ComponentFixture<L05MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L05MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L05MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
