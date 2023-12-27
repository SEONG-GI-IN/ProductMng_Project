package com.dev.ProductMng.product.service;

import java.util.Map;

public interface ProductService {
    void insertProduct(Map<String, Object> params) throws Exception;

    Map<String, Object> getProductList(Map<String, Object> params);
}
