package com.dev.ProductMng.stock;

import java.util.Map;

public interface StockService {
    void insertStock(Map<String, Object> params) throws Exception;
}
