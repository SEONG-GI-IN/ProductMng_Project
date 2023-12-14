package com.dev.ProductMng.controller;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;
import java.util.Map;

@Controller
public class productController {
    @GetMapping("/product/list")
    public String productList() {


        return "list";
    }

    @RequestMapping(value = ("/product/search"), method = {RequestMethod.POST})
    @ResponseBody
    public String productSearch(
            @RequestParam(value = "date1", required=false) @DateTimeFormat(pattern="yyyy-MM-dd") Date date1,
            @RequestParam(value= "date2", required=false) @DateTimeFormat(pattern="yyyy-MM-dd") Date date2,
            @RequestParam(value= "productCategories", required=false) String pc){

        System.out.println(date1 +"<->"+ date2 +" / "+ pc);
//       {'boardNum' : '99', spaceName : 'sn', Category: 'cate', price: 'price', regDate: 'regdate'};
        return "RETURN SEARCH";
        }
}