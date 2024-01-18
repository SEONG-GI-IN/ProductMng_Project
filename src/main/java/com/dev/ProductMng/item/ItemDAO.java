package com.dev.ProductMng.item;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ItemDAO {
    private final SqlSessionTemplate sqlSession;

    public ItemDAO(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    public void insertItem(Map<String, Object> params) throws Exception{
        sqlSession.insert("com.dev.ProductMng.item.ItemDAO.insertItem", params);
    }

    public List<Map<String, Object>> getItemList(Map<String, Object> params) {
        return sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemList", params);
    }

    public List<Map<String, Object>> getItemTypeList(Map<String, Object> params) {
        return sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemTypeList", params);
    }

    public List<Map<String, Object>> getSupplierList(Map<String, Object> params) {
        return sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getSupplierList", params);
    }
}
