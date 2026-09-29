import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { AuthService } from '@core/services/auth.service';
import { CartItem } from '@core/models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems$ = this.cartService.cartItems$;
  cartTotal$ = this.cartService.cartTotal$;
  cartCount$ = this.cartService.cartCount$;
  isLoggedIn$ = this.authService.isLoggedIn$;

  shippingEstimate = 9.99;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  incrementQuantity(item: CartItem): void {
    const result = this.cartService.updateQuantity(item.id, item.quantity + 1);
    if (result) {
      result.subscribe();
    }
  }

  decrementQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      const result = this.cartService.updateQuantity(item.id, item.quantity - 1);
      if (result) {
        result.subscribe();
      }
    }
  }

  removeItem(item: CartItem): void {
    const result = this.cartService.removeItem(item.id);
    if (result) {
      result.subscribe();
    }
  }

  clearCart(): void {
    const result = this.cartService.clearCart();
    if (result) {
      result.subscribe();
    }
  }

  getSubtotal(item: CartItem): number {
    return item.productPrice * item.quantity;
  }

  trackByCartItemId(_index: number, item: CartItem): number {
    return item.id;
  }
}
