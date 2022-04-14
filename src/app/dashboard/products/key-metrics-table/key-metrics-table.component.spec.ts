import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductFilterService } from '../product-filter/product-filter.service';

import { KeyMetricsTableComponent } from './key-metrics-table.component';

describe('KeyMetricsTableComponent', () => {
    let component: KeyMetricsTableComponent;
    let fixture: ComponentFixture<KeyMetricsTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SharedModule,
                NoopAnimationsModule
            ],
            providers: [
                provideMockStore({}),
                ProductFilterService
            ],
            declarations: [KeyMetricsTableComponent]
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

