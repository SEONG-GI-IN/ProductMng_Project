package com.dev.ProductMng.item;

import com.dev.ProductMng.config.APIException;

import java.util.List;
import java.util.Map;

public interface ItemService {
    void insertItem(Map<String, Object> params) throws Exception;

    Map<String, Object> getItemList(Map<String, Object> params) throws Exception;

    List<Map<String, Object>> getItemTypeList(Map<String, Object> params) throws Exception;

    List<Map<String, Object>> getSupplierList(Map<String, Object> params) throws Exception;

    void uploadItem(Map<String, Object> params) throws Exception;

    List<Map<String, Object>> uploadItemExcel(List<Map<String, Object>> list);

    void deleteItem(List<Map<String, Object>> list) throws Exception;

    Map<String, Object> getItemStockList(Map<String, Object> params);

    List<Map<String, Object>> uploadItemStockExcel(List<Map<String, Object>> list);

    void uploadItemStock(Map<String, Object> rowData);

    Map<String, Object> getItemSellList(Map<String, Object> params);

    List<Map<String, Object>> uploadItemSellExcel(List<Map<String, Object>> list);

    void uploadItemSell(Map<String, Object> rowData);
}
