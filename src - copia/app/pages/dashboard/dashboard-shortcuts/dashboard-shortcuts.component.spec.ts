import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardShortcutsComponent } from './dashboard-shortcuts.component';

describe('DashboardShortcutsComponent', () => {
  let component: DashboardShortcutsComponent;
  let fixture: ComponentFixture<DashboardShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardShortcutsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
