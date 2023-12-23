package com.dev.ProductMng.product.service.impl;

import com.dev.ProductMng.product.dao.ProductDAO;
import com.dev.ProductMng.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductDAO productDAO;

    @Override
    public void insertProduct(Map<String, Object> params) {
        productDAO.insertProduct(params);
    }
}
