package com.dev.ProductMng.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
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
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getProductList(Map<String, Object> params) {
        try {
            return productDAO.getProductList(params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
