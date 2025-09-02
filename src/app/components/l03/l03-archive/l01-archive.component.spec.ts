import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L01ArchiveComponent } from './l01-archive.component';

describe('L01ArchiveComponent', () => {
  let component: L01ArchiveComponent;
  let fixture: ComponentFixture<L01ArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ L01ArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L01ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
