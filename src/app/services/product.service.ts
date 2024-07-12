import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../../models/product.model';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private baseUrl = 'https://dummyjson.com/products';
    private cacheKey = 'productsCache';
    private cacheTTL = 15 * 60 * 1000; // 15 minutes

    constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

    getProducts(): Observable<{ products: Product[] }> {
        const cachedData = localStorage.getItem(this.cacheKey);
        if (cachedData) {
          const cache = JSON.parse(cachedData);
          if (Date.now() - cache.timestamp < this.cacheTTL) {
            return of(cache.data);
          }
        }
        return this.http.get<{ products: Product[] }>(`${this.baseUrl}?limit=100`).pipe(
          tap(data => {
            localStorage.setItem(this.cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
          }),
          catchError(this.errorHandler.handleError)
        );
      }

      getCategories(): Observable<{category: String[] }> {
        return this.http.get<{category:String[] }>(`${this.baseUrl}/category-list`);
      }

      getBrands(): Observable<{category:String[] }> {
        return this.http.get<{category:String[] }>(`${this.baseUrl}/categories-list`);
      }

      searchProducts(keyword: string): Observable<{ products: Product[] }> {
        return this.http.get<{ products: Product[] }>(`${this.baseUrl}/search?q=${keyword}`);
      }
}