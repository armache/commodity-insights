import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { initialProductState } from '../state/product.reducer';
import { ProductState } from '../state/product.state';

import { ProductFilterComponent } from './product-filter.component';
import { ProductFilterService } from './product-filter.service';

describe('ProductFilterComponent', () => {
    let component: ProductFilterComponent;
    let fixture: ComponentFixture<ProductFilterComponent>;
    const initialState: ProductState = initialProductState;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SharedModule,
                NoopAnimationsModule
            ],
            providers: [
                provideMockStore({ initialState }),
                ProductFilterService
            ],
            declarations: [ProductFilterComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

