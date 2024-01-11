package com.dev.ProductMng.product.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ProductDAO {
    private final SqlSessionTemplate sqlSession;

    public ProductDAO(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    public void insertProduct(Map<String, Object> params) throws Exception{
        sqlSession.insert("com.dev.ProductMng.product.dao.ProductDAO.insertProduct", params);
    }

    public List<Map<String, Object>> getProductList(Map<String, Object> params) {
        return sqlSession.selectList("com.dev.ProductMng.product.dao.ProductDAO.getProductList", params);
    }
}
