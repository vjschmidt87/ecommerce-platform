package com.portfolio.ecommerce.dto.request;

import java.math.BigDecimal;

public record ProductSearchRequest(
        String query,
        Long categoryId,
        BigDecimal minPrice,
        BigDecimal maxPrice,
        Integer page,
        Integer size
) {
    public ProductSearchRequest {
        if (page == null) page = 0;
        if (size == null) size = 12;
    }
}
