package com.dev.ProductMng.stock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

import static com.dev.ProductMng.config.handler.DateTimeCustomFormatter.DateTimeCustomFormatter;

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

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> findByBarCodeList(String barCode) {
        try {
            return DateTimeCustomFormatter(stockDAO.findByBarCodeList(barCode), new String[]{"REGISTRATION_DT"}, "yyyy-MM-dd HH:mm");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
