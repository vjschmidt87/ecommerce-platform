package com.portfolio.ecommerce.controller;

import com.portfolio.ecommerce.dto.request.AddToCartRequest;
import com.portfolio.ecommerce.dto.response.CartItemResponse;
import com.portfolio.ecommerce.service.AuthService;
import com.portfolio.ecommerce.service.CartService;
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
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Tag(name = "Cart", description = "Shopping cart operations")
public class CartController {

    private final CartService cartService;
    private final AuthService authService;

    @GetMapping
    @Operation(summary = "Get current user's cart items")
    public ResponseEntity<List<CartItemResponse>> getCartItems(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long userId = authService.getUserIdByEmail(userDetails.getUsername());
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }

    @PostMapping("/add")
    @Operation(summary = "Add item to cart")
    public ResponseEntity<CartItemResponse> addToCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody AddToCartRequest request) {
        Long userId = authService.getUserIdByEmail(userDetails.getUsername());
        CartItemResponse response = cartService.addToCart(
                userId, request.productId(), request.quantity());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{itemId}")
    @Operation(summary = "Update cart item quantity")
    public ResponseEntity<CartItemResponse> updateQuantity(
            @PathVariable Long itemId,
            @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateQuantity(itemId, quantity));
    }

    @DeleteMapping("/{itemId}")
    @Operation(summary = "Remove item from cart")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long itemId) {
        cartService.removeFromCart(itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    @Operation(summary = "Clear all items from cart")
    public ResponseEntity<Void> clearCart(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long userId = authService.getUserIdByEmail(userDetails.getUsername());
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
