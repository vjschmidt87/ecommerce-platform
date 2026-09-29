import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const ORDER_ROUTES: Routes = [
  { path: '', component: OrderHistoryComponent, canActivate: [authGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: ':id', component: OrderDetailComponent, canActivate: [authGuard] }
];
