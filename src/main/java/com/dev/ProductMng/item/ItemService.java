package com.dev.ProductMng.item;

import java.util.List;
import java.util.Map;

public interface ItemService {
    void insertItem(Map<String, Object> params) throws Exception;

    List<Map<String, Object>> getItemList(Map<String, Object> params);
}
