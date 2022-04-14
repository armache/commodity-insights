import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialProductState } from '../state/product.reducer';
import { ProductState } from '../state/product.state';
import { ProductFilterService } from './product-filter.service';

describe('ProductFilterService', () => {
  let service: ProductFilterService;
  const initialState: ProductState = initialProductState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState})
      ]
    });
    service = TestBed.inject(ProductFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

