package com.dev.ProductMng.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class CommonServiceImpl implements CommonService{

    @Autowired
    CommonDAO commonDAO;

    @Override
    public List<Map<String, Object>> getUpCodeList(Map<String, Object> params) {
        return commonDAO.getUpCodeList(params);
    }

    @Override
    public void insertUpCode(Map<String, Object> params) throws Exception{
        try{
            commonDAO.insertUpCode(params);
        } catch (Exception e){
            throw new Exception(e);
        }
    }

    @Override
    public List<Map<String, Object>> getCodeList(Map<String, Object> params) {
        return commonDAO.getCodeList(params);
    }

    @Override
    public void insertCode(Map<String, Object> params) throws Exception{
        try{
            commonDAO.insertCode(params);
        } catch (Exception e){
            throw new Exception(e);
        }
    }

}
