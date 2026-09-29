package com.portfolio.ecommerce.service;

import com.portfolio.ecommerce.dto.response.CartItemResponse;

import java.util.List;

public interface CartService {

    List<CartItemResponse> getCartItems(Long userId);

    CartItemResponse addToCart(Long userId, Long productId, int quantity);

    CartItemResponse updateQuantity(Long cartItemId, int quantity);

    void removeFromCart(Long cartItemId);

    void clearCart(Long userId);
}
