import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Category, PageResponse, Product } from '@core/models/product.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = `${environment.apiUrl}/api/products`;
  private readonly categoriesUrl = `${environment.apiUrl}/api/categories`;

  constructor(private http: HttpClient) {}

  getProducts(
    page: number = 0,
    size: number = 12,
    categoryId?: number,
    query?: string,
    minPrice?: number,
    maxPrice?: number
  ): Observable<PageResponse<Product>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (categoryId) {
      params = params.set('categoryId', categoryId.toString());
    }
    if (query && query.trim()) {
      params = params.set('query', query.trim());
    }
    if (minPrice !== undefined && minPrice !== null) {
      params = params.set('minPrice', minPrice.toString());
    }
    if (maxPrice !== undefined && maxPrice !== null) {
      params = params.set('maxPrice', maxPrice.toString());
    }

    return this.http.get<PageResponse<Product>>(this.apiUrl, { params }).pipe(
      catchError(this.handleError('Failed to load products'))
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError('Failed to load product details'))
    );
  }

  searchProducts(query: string, page: number = 0, size: number = 12): Observable<PageResponse<Product>> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Product>>(`${this.apiUrl}/search`, { params }).pipe(
      catchError(this.handleError('Failed to search products'))
    );
  }

  getProductsByCategory(categoryId: number, page: number = 0, size: number = 12): Observable<PageResponse<Product>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Product>>(`${this.apiUrl}/category/${categoryId}`, { params }).pipe(
      catchError(this.handleError('Failed to load products for this category'))
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl).pipe(
      catchError(this.handleError('Failed to load categories'))
    );
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.categoriesUrl}/${id}`).pipe(
      catchError(this.handleError('Failed to load category'))
    );
  }

  private handleError(userMessage: string) {
    return (error: unknown) => {
      console.error(userMessage, error);
      return throwError(() => ({ userMessage, error }));
    };
  }
}
