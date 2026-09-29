import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { AddToCartRequest, CartItem } from '@core/models/product.model';
import { AuthService } from './auth.service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly apiUrl = `${environment.apiUrl}/api/cart`;
  private readonly CART_KEY = 'cart_items';

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  cartCount$ = this.cartItems$.pipe(
    map(items => items.reduce((total, item) => total + item.quantity, 0))
  );

  cartTotal$ = this.cartItems$.pipe(
    map(items => items.reduce((total, item) => total + (item.productPrice * item.quantity), 0))
  );

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.loadCart();
  }

  loadCart(): void {
    if (this.authService.isLoggedIn()) {
      this.http.get<CartItem[]>(this.apiUrl).subscribe({
        next: (items) => this.cartItemsSubject.next(items),
        error: () => this.loadLocalCart()
      });
    } else {
      this.loadLocalCart();
    }
  }

  addToCart(item: AddToCartRequest): Observable<CartItem> | void {
    if (this.authService.isLoggedIn()) {
      return this.http.post<CartItem>(`${this.apiUrl}/add`, item).pipe(
        tap(() => this.loadCart())
      );
    } else {
      this.addToLocalCart(item);
    }
  }

  updateQuantity(itemId: number, quantity: number): Observable<CartItem> | void {
    if (this.authService.isLoggedIn()) {
      return this.http.put<CartItem>(`${this.apiUrl}/${itemId}`, { quantity }).pipe(
        tap(() => this.loadCart())
      );
    } else {
      this.updateLocalCartQuantity(itemId, quantity);
    }
  }

  removeItem(itemId: number): Observable<void> | void {
    if (this.authService.isLoggedIn()) {
      return this.http.delete<void>(`${this.apiUrl}/${itemId}`).pipe(
        tap(() => this.loadCart())
      );
    } else {
      this.removeLocalCartItem(itemId);
    }
  }

  clearCart(): Observable<void> | void {
    if (this.authService.isLoggedIn()) {
      return this.http.delete<void>(`${this.apiUrl}/clear`).pipe(
        tap(() => this.cartItemsSubject.next([]))
      );
    } else {
      localStorage.removeItem(this.CART_KEY);
      this.cartItemsSubject.next([]);
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  private loadLocalCart(): void {
    const cartJson = localStorage.getItem(this.CART_KEY);
    if (cartJson) {
      try {
        this.cartItemsSubject.next(JSON.parse(cartJson));
      } catch {
        this.cartItemsSubject.next([]);
      }
    }
  }

  private saveLocalCart(items: CartItem[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(items));
    this.cartItemsSubject.next(items);
  }

  private addToLocalCart(request: AddToCartRequest): void {
    const items = [...this.cartItemsSubject.value];
    const existingIndex = items.findIndex(i => i.productId === request.productId);

    if (existingIndex >= 0) {
      items[existingIndex] = {
        ...items[existingIndex],
        quantity: items[existingIndex].quantity + request.quantity
      };
    } else {
      items.push({
        id: Date.now(),
        productId: request.productId,
        productName: '',
        productPrice: 0,
        productImageUrl: '',
        quantity: request.quantity
      });
    }

    this.saveLocalCart(items);
  }

  private updateLocalCartQuantity(itemId: number, quantity: number): void {
    const items = this.cartItemsSubject.value.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    this.saveLocalCart(items);
  }

  private removeLocalCartItem(itemId: number): void {
    const items = this.cartItemsSubject.value.filter(item => item.id !== itemId);
    this.saveLocalCart(items);
  }
}
