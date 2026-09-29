package com.portfolio.ecommerce.service;

import com.portfolio.ecommerce.dto.request.CreateCategoryRequest;
import com.portfolio.ecommerce.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> getAllCategories();

    CategoryResponse getCategoryById(Long id);

    CategoryResponse createCategory(CreateCategoryRequest request);
}
