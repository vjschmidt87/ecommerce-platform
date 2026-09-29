import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductService } from '@core/services/product.service';
import { CartService } from '@core/services/cart.service';
import { Product } from '@core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  quantity = 1;
  loading = true;
  added = false;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.loading = true;
        return this.productService.getProduct(+params['id']);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
        this.quantity = 1;
        this.loadRelatedProducts(product.categoryId, product.id);
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  private loadRelatedProducts(categoryId: number, currentProductId: number): void {
    this.productService.getProductsByCategory(categoryId, 0, 5).subscribe({
      next: (response) => {
        this.relatedProducts = response.content.filter(p => p.id !== currentProductId).slice(0, 4);
      }
    });
  }

  incrementQuantity(): void {
    if (this.product && this.quantity < this.product.stockQuantity) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (!this.product) return;

    const result = this.cartService.addToCart({
      productId: this.product.id,
      quantity: this.quantity
    });

    if (result) {
      result.subscribe();
    }

    this.added = true;
    setTimeout(() => this.added = false, 2000);
  }

  trackByProductId(_index: number, product: Product): number {
    return product.id;
  }

  get inStock(): boolean {
    return !!this.product && this.product.stockQuantity > 0;
  }
}
