import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { TradeLogsComponent } from './trade-logs.component';

describe('TradeLogsComponent', () => {
  let component: TradeLogsComponent;
  let fixture: ComponentFixture<TradeLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
          SharedModule,
          NoopAnimationsModule
      ],
      providers: [
        provideMockStore({})
      ],
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

