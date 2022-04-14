import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared/shared.module';
import { DashboardService } from './dashboard.service';

describe('ProductService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            SharedModule
        ]
    });
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
