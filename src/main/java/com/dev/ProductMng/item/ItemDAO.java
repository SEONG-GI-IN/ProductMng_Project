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
        sqlSession.insert("com.dev.ItemMng.item.ItemDAO.insertItem", params);
    }

    public List<Map<String, Object>> getItemList(Map<String, Object> params) {
        return sqlSession.selectList("com.dev.ItemMng.item.ItemDAO.getItemList", params);
    }
}
