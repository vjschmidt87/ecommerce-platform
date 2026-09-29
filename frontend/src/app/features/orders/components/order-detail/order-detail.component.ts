import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrderService } from '@core/services/order.service';
import { Order, OrderItem, OrderStatus } from '@core/models/product.model';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  loading = true;
  cancelling = false;

  statusSteps: OrderStatus[] = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED'];

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.loading = true;
        return this.orderService.getOrderById(+params['id']);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (order) => {
        this.order = order;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getStatusClass(status: OrderStatus): string {
    const classMap: Record<OrderStatus, string> = {
      'PENDING': 'badge-warning',
      'CONFIRMED': 'badge-primary',
      'SHIPPED': 'badge-primary',
      'DELIVERED': 'badge-success',
      'CANCELLED': 'badge-danger'
    };
    return classMap[status] || 'badge-primary';
  }

  isStepComplete(step: OrderStatus): boolean {
    if (!this.order) return false;
    if (this.order.status === 'CANCELLED') return false;
    const currentIndex = this.statusSteps.indexOf(this.order.status);
    const stepIndex = this.statusSteps.indexOf(step);
    return stepIndex <= currentIndex;
  }

  isStepCurrent(step: OrderStatus): boolean {
    return this.order?.status === step;
  }

  get canCancel(): boolean {
    return this.order?.status === 'PENDING';
  }

  cancelOrder(): void {
    if (!this.order || !this.canCancel) return;

    this.cancelling = true;
    this.orderService.cancelOrder(this.order.id).subscribe({
      next: (updatedOrder) => {
        this.order = updatedOrder;
        this.cancelling = false;
      },
      error: () => {
        this.cancelling = false;
      }
    });
  }

  trackByOrderItemId(_index: number, item: OrderItem): number {
    return item.id;
  }

  trackByStep(_index: number, step: OrderStatus): string {
    return step;
  }
}
