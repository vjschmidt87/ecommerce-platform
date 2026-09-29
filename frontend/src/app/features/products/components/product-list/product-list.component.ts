import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductService } from '@core/services/product.service';
import { PageResponse, Product } from '@core/models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, SearchBarComponent, CategoryFilterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  totalPages = 0;
  totalElements = 0;
  currentPage = 0;
  pageSize = 12;

  private readonly destroyRef = inject(DestroyRef);
  private searchQuery$ = new BehaviorSubject<string>('');
  private selectedCategory$ = new BehaviorSubject<number | null>(null);
  private page$ = new BehaviorSubject<number>(0);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    combineLatest([
      this.searchQuery$,
      this.selectedCategory$,
      this.page$
    ]).pipe(
      tap(() => this.loading = true),
      switchMap(([query, categoryId, page]) =>
        this.productService.getProducts(
          page,
          this.pageSize,
          categoryId ?? undefined,
          query || undefined
        )
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (response: PageResponse<Product>) => {
        this.products = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.currentPage = response.number;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.products = [];
      }
    });
  }

  onSearchChange(query: string): void {
    this.page$.next(0);
    this.searchQuery$.next(query);
  }

  onCategoryChange(categoryId: number | null): void {
    this.page$.next(0);
    this.selectedCategory$.next(categoryId);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.page$.next(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  trackByProductId(_index: number, product: Product): number {
    return product.id;
  }

  trackByPageIndex(_index: number, page: number): number {
    return page;
  }

  get pages(): number[] {
    const pages: number[] = [];
    const start = Math.max(0, this.currentPage - 2);
    const end = Math.min(this.totalPages, start + 5);
    for (let i = start; i < end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
