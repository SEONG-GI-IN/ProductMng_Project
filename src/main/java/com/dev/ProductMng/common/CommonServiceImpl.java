package com.dev.ProductMng.common;

import ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
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

    @Override
    public void deleteUpCode(Map<String, Object> params) throws Exception{
        try{
            commonDAO.deleteUpCode(params);
        } catch (Exception e){
            throw new Exception(e);
        }
    }

    @Override
    public void deleteCode(List<Map<String, Object>> list) throws Exception{
        try{
            System.out.println("list: " + list);
            list.stream().forEach(element -> commonDAO.deleteCode(element));
        } catch (Exception e){
            throw new Exception(e);
        }
    }

}
