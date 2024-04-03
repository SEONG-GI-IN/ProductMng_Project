package com.dev.ProductMng.item;

import com.dev.ProductMng.config.APIException;

import java.util.List;
import java.util.Map;

public interface ItemService {
    void insertItem(Map<String, Object> params) throws Exception;

    List<Map<String, Object>> getItemList(Map<String, Object> params) throws Exception;

    List<Map<String, Object>> getItemTypeList(Map<String, Object> params) throws Exception;

    List<Map<String, Object>> getSupplierList(Map<String, Object> params) throws Exception;

    void uploadItem(Map<String, Object> params) throws Exception;

    List<Map<String, Object>> uploadItemExcel(List<Map<String, Object>> list);

    void deleteItem(List<Map<String, Object>> list) throws Exception;

    List<Map<String, Object>> getItemStockList(Map<String, Object> params);

    List<Map<String, Object>> uploadItemStockExcel(List<Map<String, Object>> list);

    void uploadItemStock(Map<String, Object> rowData);

    List<Map<String, Object>> getItemSellList(Map<String, Object> params);

    List<Map<String, Object>> uploadItemSellExcel(List<Map<String, Object>> list);

    void uploadItemSell(Map<String, Object> rowData);

    List<Map<String, Object>> getItemSmartList(Map<String, Object> params);

    void updateItem(List<Map<String, Object>> list);

    List<Map<String, Object>> getItemRemainList(Map<String, Object> params);

    void updateItemRemainCnt(List<Map<String, Object>> list);

    void updateItemStock(List<Map<String, Object>> list);

    List<Map<String, Object>> getCashFlowList(Map<String, Object> params);

    void updateItemDtl(Map<String, Object> params);

    void insertPriceTag(List<Map<String, Object>> list);

    Map<String, Object> getPriceTagList(Map<String, Object> params);

    void deletePriceTag(List<Map<String, Object>> list);

    Map<String, Object> getItemBuyList(Map<String, Object> params);

    void insertItemBuyList();

    List<Map<String, Object>> getItemNmList(Map<String, Object> params);

    void updateItemBuyList(List<Map<String, Object>> list);
}
