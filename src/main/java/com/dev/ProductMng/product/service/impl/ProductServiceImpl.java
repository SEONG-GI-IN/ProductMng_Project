package com.dev.ProductMng.product.service.impl;

import com.dev.ProductMng.product.dao.ProductDAO;
import com.dev.ProductMng.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductDAO productDAO;

    @Override
    public void insertProduct(Map<String, Object> params) throws Exception{
        try{
            productDAO.insertProduct(params);
        } catch (Exception e){
            throw new Exception(e);
        }
    }

    @Override
    public List<Map<String, Object>> getProductList(Map<String, Object> params) {
        try {
            return productDAO.getProductList(params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
