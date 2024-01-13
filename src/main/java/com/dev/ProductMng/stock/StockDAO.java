package com.dev.ProductMng.stock;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class StockDAO {
    private final SqlSessionTemplate sqlSession;

    public StockDAO(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    public void insertStock(Map<String, Object> params) throws Exception{
        sqlSession.insert("com.dev.ProductMng.product.dao.StockDAO.insertStock", params);
    }
}
