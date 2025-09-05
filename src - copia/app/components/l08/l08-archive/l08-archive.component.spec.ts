import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L08ArchiveComponent } from './l08-archive.component';

describe('L08ArchiveComponent', () => {
  let component: L08ArchiveComponent;
  let fixture: ComponentFixture<L08ArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L08ArchiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L08ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
