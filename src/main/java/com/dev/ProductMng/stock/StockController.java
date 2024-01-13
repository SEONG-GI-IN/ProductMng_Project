package com.dev.ProductMng.stock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
@RequestMapping("/stock")
public class StockController {

    @Autowired
    private StockService stockService;

    @RequestMapping(value = ("/insertStock"), method = {RequestMethod.POST})
    @ResponseBody
    public boolean insertStock(@RequestParam Map<String, Object> params){
        try {
            stockService.insertStock(params);
            return true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

}
