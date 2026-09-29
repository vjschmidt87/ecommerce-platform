import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { OrderService } from '@core/services/order.service';
import { CartItem } from '@core/models/product.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  addressForm: FormGroup;
  cartItems$ = this.cartService.cartItems$;
  cartTotal$ = this.cartService.cartTotal$;
  cartCount$ = this.cartService.cartCount$;

  loading = false;
  error = '';
  shippingCost = 9.99;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.addressForm = this.fb.group({
      street: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.minLength(2)]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      country: ['United States', [Validators.required]]
    });
  }

  get f() {
    return this.addressForm.controls;
  }

  trackByItemId(_index: number, item: CartItem): number {
    return item.id;
  }

  placeOrder(): void {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    this.orderService.placeOrder({
      shippingAddress: this.addressForm.value
    }).subscribe({
      next: (order) => {
        this.router.navigate(['/orders', order.id]);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Failed to place order. Please try again.';
      }
    });
  }
}
