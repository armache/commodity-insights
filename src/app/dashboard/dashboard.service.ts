import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { TradeLog } from '../shared/models/trade-log';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = environment.apiUrl;
  private productsUrl = 'api/products';
  private tradeLogsUrl = 'api/trade-logs';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(this.baseUrl + this.productsUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTradeLogs(): Observable<TradeLog[]> {

    return this.http.get<TradeLog[]>(this.baseUrl + this.tradeLogsUrl)
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