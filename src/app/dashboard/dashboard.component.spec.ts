import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { provideMockStore } from "@ngrx/store/testing";
import { SharedModule } from "../shared/shared.module";
import { initialUserState } from "../user/state/user.reducer";
import { UserState } from "../user/state/user.state";
import { DashboardComponent } from "./dashboard.component";

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    const initialState: UserState = initialUserState;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            imports: [
                SharedModule,
                NoopAnimationsModule
            ],
            providers: [provideMockStore({initialState})],
            declarations: [DashboardComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
