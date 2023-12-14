package com.dev.ProductMng.controller;

import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
public class productController {
    @GetMapping("/product/list")
    public String productList() {


        return "list";
    }

    @RequestMapping(value = ("/product/search"), method = {RequestMethod.GET})
    @ResponseBody
    public JSONArray productSearch(
            @RequestParam(value = "date1", required=false) @DateTimeFormat(pattern="yyyy-MM-dd") Date date1,
            @RequestParam(value= "date2", required=false) @DateTimeFormat(pattern="yyyy-MM-dd") Date date2,
            @RequestParam(value= "productCategories", required=false) String pc){

        System.out.println(date1 +"<->"+ date2 +" / "+ pc);
//       {'boardNum' : '99', spaceName : 'sn', Category: 'cate', price: 'price', regDate: 'regdate'};

        /* (TEST) JSON DATA */
        JSONArray array = new JSONArray();
        List<JSONObject> listObj = new ArrayList<>();

        /* (TEST) 날짜 포멧 */
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy년 MM월 dd일");
        String nowDate = sdf.format(date1);

        for(int i=0; i<10; i++) {
            JSONObject obj1 = new JSONObject();
            obj1.put("boardNum" , i);
            obj1.put("spaceName" , "sn" + i );
            obj1.put("Category" , pc);
            obj1.put("price" , "price"  + i);
            obj1.put("regDate" , nowDate);
            listObj.add(obj1);

        }

        for(int i=0; i<listObj.size()-1; i++){
            array.add(listObj.get(i));
        }

        return array;
        }
}