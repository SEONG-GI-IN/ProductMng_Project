package com.dev.ProductMng.common;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CommonDAO {

    private final SqlSessionTemplate sqlSession;

    public CommonDAO(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    public List<Map<String, Object>> getUpCodeList(Map<String, Object> params) {
        return sqlSession.selectList("com.dev.ProductMng.common.CommonDAO.getUpCodeList", params);
    }

    public void insertUpCode(Map<String, Object> params) {
        sqlSession.insert("com.dev.ProductMng.common.CommonDAO.insertUpCode", params);
    }

    public List<Map<String, Object>> getCodeList(Map<String, Object> params) {
        return sqlSession.selectList("com.dev.ProductMng.common.CommonDAO.getCodeList", params);
    }

    public void insertCode(Map<String, Object> params) {
        sqlSession.insert("com.dev.ProductMng.common.CommonDAO.insertCode", params);
    }

    public void deleteUpCode(Map<String, Object> params) {
        sqlSession.delete("com.dev.ProductMng.common.CommonDAO.deleteUpCode", params);
    }

    public void deleteCode(Map<String, Object> params) {
        sqlSession.delete("com.dev.ProductMng.common.CommonDAO.deleteCode", params);
    }
}
