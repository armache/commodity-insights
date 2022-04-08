import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl;
  private productsUrl = 'api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(this.baseUrl + this.productsUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {
    let errorMessage: string;

    if (err.error instanceof ErrorEvent) {
      errorMessage = `Backend Error: ${err.error.message}`;
    } else {
      errorMessage = `Backend Error: ${err.message}`;
    }

    console.error(err);

    return throwError(() => errorMessage);
  }  
}