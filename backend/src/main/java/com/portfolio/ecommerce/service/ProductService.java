package com.portfolio.ecommerce.service;

import com.portfolio.ecommerce.dto.request.CreateProductRequest;
import com.portfolio.ecommerce.dto.request.UpdateProductRequest;
import com.portfolio.ecommerce.dto.response.ProductResponse;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;

public interface ProductService {

    Page<ProductResponse> getAllProducts(int page, int size);

    ProductResponse getProductById(Long id);

    Page<ProductResponse> searchProducts(String query, Long categoryId,
                                          BigDecimal minPrice, BigDecimal maxPrice,
                                          int page, int size);

    Page<ProductResponse> getProductsByCategory(Long categoryId, int page, int size);

    ProductResponse createProduct(CreateProductRequest request);

    ProductResponse updateProduct(Long id, UpdateProductRequest request);
}
