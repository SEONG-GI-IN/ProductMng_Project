package com.dev.ProductMng.product.service;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface ProductService {
    void insertProduct(Map<String, Object> params);
}
