package com.portfolio.ecommerce.controller;

import com.portfolio.ecommerce.dto.request.CreateOrderRequest;
import com.portfolio.ecommerce.dto.response.OrderResponse;
import com.portfolio.ecommerce.service.AuthService;
import com.portfolio.ecommerce.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Tag(name = "Orders", description = "Order placement and management")
public class OrderController {

    private final OrderService orderService;
    private final AuthService authService;

    @PostMapping
    @Operation(summary = "Place a new order from cart items")
    public ResponseEntity<OrderResponse> placeOrder(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CreateOrderRequest request) {
        Long userId = authService.getUserIdByEmail(userDetails.getUsername());
        OrderResponse response = orderService.placeOrder(userId, request.shippingAddressId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "Get current user's order history")
    public ResponseEntity<List<OrderResponse>> getOrders(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long userId = authService.getUserIdByEmail(userDetails.getUsername());
        return ResponseEntity.ok(orderService.getOrders(userId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get order details by ID")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PutMapping("/{id}/cancel")
    @Operation(summary = "Cancel a pending order")
    public ResponseEntity<OrderResponse> cancelOrder(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long userId = authService.getUserIdByEmail(userDetails.getUsername());
        return ResponseEntity.ok(orderService.cancelOrder(id, userId));
    }
}
