package com.dev.ProductMng.stock;

import java.util.List;
import java.util.Map;

public interface StockService {
    void insertStock(Map<String, Object> params) throws Exception;
    List<Map<String, Object>> findByBarCodeList(String barCode);
}
