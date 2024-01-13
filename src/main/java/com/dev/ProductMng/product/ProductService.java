package com.dev.ProductMng.product;

import java.util.List;
import java.util.Map;

public interface ProductService {
    void insertProduct(Map<String, Object> params) throws Exception;

    List<Map<String, Object>> getProductList(Map<String, Object> params);
}
