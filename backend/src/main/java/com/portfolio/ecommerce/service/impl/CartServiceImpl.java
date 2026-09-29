package com.portfolio.ecommerce.service.impl;

import com.portfolio.ecommerce.dto.response.CartItemResponse;
import com.portfolio.ecommerce.entity.CartItem;
import com.portfolio.ecommerce.entity.Product;
import com.portfolio.ecommerce.entity.User;
import com.portfolio.ecommerce.exception.BadRequestException;
import com.portfolio.ecommerce.exception.ResourceNotFoundException;
import com.portfolio.ecommerce.repository.CartItemRepository;
import com.portfolio.ecommerce.repository.ProductRepository;
import com.portfolio.ecommerce.repository.UserRepository;
import com.portfolio.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CartItemResponse> getCartItems(Long userId) {
        return cartItemRepository.findByUserId(userId).stream()
                .map(CartItemResponse::from)
                .toList();
    }

    @Override
    @Transactional
    public CartItemResponse addToCart(Long userId, Long productId, int quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", productId));

        if (!product.getActive()) {
            throw new BadRequestException("Product is not available");
        }

        if (product.getStockQuantity() < quantity) {
            throw new BadRequestException("Insufficient stock. Available: " + product.getStockQuantity());
        }

        Optional<CartItem> existingItem = cartItemRepository.findByUserIdAndProductId(userId, productId);

        CartItem cartItem;
        if (existingItem.isPresent()) {
            cartItem = existingItem.get();
            int newQuantity = cartItem.getQuantity() + quantity;
            if (product.getStockQuantity() < newQuantity) {
                throw new BadRequestException("Insufficient stock. Available: " + product.getStockQuantity());
            }
            cartItem.setQuantity(newQuantity);
        } else {
            cartItem = CartItem.builder()
                    .user(user)
                    .product(product)
                    .quantity(quantity)
                    .build();
        }

        CartItem saved = cartItemRepository.save(cartItem);
        return CartItemResponse.from(saved);
    }

    @Override
    @Transactional
    public CartItemResponse updateQuantity(Long cartItemId, int quantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item", cartItemId));

        if (quantity <= 0) {
            throw new BadRequestException("Quantity must be at least 1");
        }

        if (cartItem.getProduct().getStockQuantity() < quantity) {
            throw new BadRequestException(
                    "Insufficient stock. Available: " + cartItem.getProduct().getStockQuantity());
        }

        cartItem.setQuantity(quantity);
        CartItem saved = cartItemRepository.save(cartItem);
        return CartItemResponse.from(saved);
    }

    @Override
    @Transactional
    public void removeFromCart(Long cartItemId) {
        if (!cartItemRepository.existsById(cartItemId)) {
            throw new ResourceNotFoundException("Cart item", cartItemId);
        }
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    @Transactional
    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }
}
