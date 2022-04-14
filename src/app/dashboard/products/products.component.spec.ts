import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NgChartsModule } from 'ng2-charts';
import { initialUserState } from 'src/app/user/state/user.reducer';
import { UserState } from 'src/app/user/state/user.state';

import { ProductsComponent } from './products.component';

describe('TrendsComponent', () => {
    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;
    const initialState: UserState = initialUserState;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [NgChartsModule],
            providers: [provideMockStore({initialState})],
            declarations: [ProductsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
