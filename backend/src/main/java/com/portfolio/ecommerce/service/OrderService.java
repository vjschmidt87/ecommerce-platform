package com.portfolio.ecommerce.service;

import com.portfolio.ecommerce.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {

    OrderResponse placeOrder(Long userId, Long shippingAddressId);

    List<OrderResponse> getOrders(Long userId);

    OrderResponse getOrderById(Long orderId);

    OrderResponse cancelOrder(Long orderId, Long userId);
}
