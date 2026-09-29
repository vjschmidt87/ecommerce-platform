package com.portfolio.ecommerce.dto.response;

import com.portfolio.ecommerce.entity.CartItem;

import java.math.BigDecimal;

public record CartItemResponse(
        Long id,
        Long productId,
        String productName,
        String productImageUrl,
        BigDecimal productPrice,
        Integer quantity,
        BigDecimal subtotal
) {
    public static CartItemResponse from(CartItem cartItem) {
        BigDecimal price = cartItem.getProduct().getPrice();
        return new CartItemResponse(
                cartItem.getId(),
                cartItem.getProduct().getId(),
                cartItem.getProduct().getName(),
                cartItem.getProduct().getImageUrl(),
                price,
                cartItem.getQuantity(),
                price.multiply(BigDecimal.valueOf(cartItem.getQuantity()))
        );
    }
}
