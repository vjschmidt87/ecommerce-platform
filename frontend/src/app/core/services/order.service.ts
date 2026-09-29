import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CreateOrderRequest, Order } from '@core/models/product.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly apiUrl = `${environment.apiUrl}/api/orders`;

  constructor(private http: HttpClient) {}

  placeOrder(request: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, request).pipe(
      catchError(this.handleError('Failed to place order'))
    );
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      catchError(this.handleError('Failed to load orders'))
    );
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError('Failed to load order details'))
    );
  }

  cancelOrder(id: number): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}/cancel`, {}).pipe(
      catchError(this.handleError('Failed to cancel order'))
    );
  }

  private handleError(userMessage: string) {
    return (error: unknown) => {
      console.error(userMessage, error);
      return throwError(() => error);
    };
  }
}
