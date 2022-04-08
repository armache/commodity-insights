import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeLogsComponent } from './trade-logs.component';

describe('TradeLogsComponent', () => {
  let component: TradeLogsComponent;
  let fixture: ComponentFixture<TradeLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
