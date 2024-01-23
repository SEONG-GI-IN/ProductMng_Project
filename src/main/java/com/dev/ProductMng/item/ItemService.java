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

    List<Map<String, Object>> uploadExcel(List<Map<String, Object>> list);

    void deleteItem(List<Map<String, Object>> list) throws Exception;
}
