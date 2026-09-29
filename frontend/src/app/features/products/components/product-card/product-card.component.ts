import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '@core/models/product.model';
import { CartService } from '@core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  added = false;

  constructor(private cartService: CartService) {}

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const result = this.cartService.addToCart({
      productId: this.product.id,
      quantity: 1
    });

    if (result) {
      result.subscribe();
    }

    this.added = true;
    setTimeout(() => this.added = false, 1500);
  }

  get inStock(): boolean {
    return this.product.stockQuantity > 0;
  }
}
