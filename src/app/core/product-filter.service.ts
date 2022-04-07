import { Injectable } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { getAvailableYears } from '../dashboard/state/product.reducer';
import { ProductState } from '../dashboard/state/product.state';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {

  private sub: Subscription | undefined

  private selectedYearSubject = new Subject<number>()
  selectedYearSubject$ = this.selectedYearSubject.asObservable();

  private productToggleSubject = new Subject<string>()
  productToggleSubject$ = this.productToggleSubject.asObservable();

  private resetProductTogglesSubject = new Subject<void>()
  resetProductTogglesSubject$ = this.resetProductTogglesSubject.asObservable();

  checkboxValues = new Map<string, boolean>();

  constructor(private store: Store<ProductState>) {

  }

  changeYearFilter(year: number) {
    this.selectedYearSubject.next(year);
    //this.resetProductTogglesSubject.next();
    this.reset();
  }

  reset() {
    let checkboxes = document.getElementsByTagName('mat-checkbox');

    for(let i = 0; i < checkboxes.length; i++) {
      //console.log('xx', (<MatCheckbox>checkboxes[i]).checked);
    }
  }

  toggleProduct(productName: string) {
    console.log('dddd');
    if(!this.checkboxValues.has(productName)) {
      this.checkboxValues.set(productName, false);
    }

    this.productToggleSubject.next(productName);
  }

  resetProductToggles() {    
    this.checkboxValues.forEach((value: boolean, key: string) => {
      //console.log(key, value);
      if(!value) {
        this.productToggleSubject.next(key);
      }
  });
  }

  public setDefaultFilterValues() {
    this.sub = this.store.select(getAvailableYears).subscribe(years => {

      if (years) {
        let defaultYear = years[0];
        this.changeYearFilter(defaultYear);

        this.sub?.unsubscribe();
      }
    });
  }
}
