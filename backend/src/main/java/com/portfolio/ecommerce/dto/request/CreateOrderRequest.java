package com.portfolio.ecommerce.dto.request;

import jakarta.validation.constraints.NotNull;

public record CreateOrderRequest(
        @NotNull(message = "Shipping address ID is required")
        Long shippingAddressId
) {}
