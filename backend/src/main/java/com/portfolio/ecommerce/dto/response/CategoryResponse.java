package com.portfolio.ecommerce.dto.response;

import com.portfolio.ecommerce.entity.Category;

public record CategoryResponse(
        Long id,
        String name,
        String description,
        String imageUrl
) {
    public static CategoryResponse from(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getImageUrl()
        );
    }
}
