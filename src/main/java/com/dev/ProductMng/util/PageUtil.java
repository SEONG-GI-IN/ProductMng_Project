package com.dev.ProductMng.util;

import java.util.Map;

public class PageUtil {

    //setPagination
    public static void setPaging(Map<String, Object> params) {
        Integer page = Integer.parseInt(String.valueOf(params.get("page")));
        Integer pageSize = Integer.parseInt(String.valueOf(params.get("pageSize")));
        int pageNum = (page - 1) * pageSize;

        if (page != null && pageSize != null) {
            params.put("pageNum", pageNum);
            params.put("page", page);
            params.put("pageSize", pageSize);
            params.put("currentPage", page);
        }
    }

}
