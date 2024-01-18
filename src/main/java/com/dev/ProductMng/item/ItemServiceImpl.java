package com.dev.ProductMng.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    @Autowired
    ItemDAO itemDAO;

    @Override
    public void insertItem(Map<String, Object> params) throws Exception{
        try{
            itemDAO.insertItem(params);
        } catch (Exception e){
            throw new Exception(e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getItemList(Map<String, Object> params) {
        try {
            return itemDAO.getItemList(params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getItemTypeList(Map<String, Object> params) {
        try {
            return itemDAO.getItemTypeList(params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getSupplierList(Map<String, Object> params) {
        try {
            return itemDAO.getSupplierList(params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
