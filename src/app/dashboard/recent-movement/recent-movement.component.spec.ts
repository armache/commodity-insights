import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentMovementComponent } from './recent-movement.component';

describe('RecentMovementComponent', () => {
  let component: RecentMovementComponent;
  let fixture: ComponentFixture<RecentMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentMovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
