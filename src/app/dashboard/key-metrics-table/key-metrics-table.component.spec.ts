import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyMetricsTableComponent } from './key-metrics-table.component';

describe('KeyMetricsTableComponent', () => {
  let component: KeyMetricsTableComponent;
  let fixture: ComponentFixture<KeyMetricsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyMetricsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyMetricsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
