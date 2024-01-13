package com.dev.ProductMng.service.impl;

import com.dev.ProductMng.dao.StockDAO;
import com.dev.ProductMng.service.ProductService;
import com.dev.ProductMng.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@Transactional
public class StockServiceImpl implements StockService {

    @Autowired
    private StockDAO stockDAO;

    @Override
    public void insertStock(Map<String, Object> params) throws Exception{
        try{
            stockDAO.insertStock(params);
        } catch (Exception e){
            throw new Exception(e);
        }
    }
}
