package com.dev.ProductMng.common;

import java.util.List;
import java.util.Map;

public interface CommonService {

    List<Map<String, Object>> getUpCodeList(Map<String, Object> params) throws Exception;

    void insertUpCode(Map<String, Object> params) throws Exception;

    List<Map<String, Object>> getCodeList(Map<String, Object> params) throws Exception;

    void insertCode(Map<String, Object> params) throws Exception;

    void deleteUpCode(Map<String, Object> params) throws Exception;

    void deleteCode(List<Map<String, Object>> list) throws Exception;
}
