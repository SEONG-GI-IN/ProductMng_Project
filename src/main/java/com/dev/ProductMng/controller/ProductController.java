package com.dev.ProductMng.controller;

import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Controller
public class ProductController {
    @GetMapping("/product/list")
    public String productList() {


        return "list";
    }

    @RequestMapping(value = ("/product/search"), method = {RequestMethod.GET})
    @ResponseBody
    public JSONArray productSearch(
            @RequestParam(value = "date1", required=false) @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate date1,
            @RequestParam(value= "date2", required=false) @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate date2,
            @RequestParam(value= "productCategories", required=false) String pc){

        System.out.println(date1 +" <-> "+ date2 +" / "+ pc);

        /* (TEST) JSON DATA */
        JSONArray array = new JSONArray();
        List<JSONObject> listObj = new ArrayList<>();

        /* (TEST) 날짜 포멧 */
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy년 MM월 dd일");
//        String nowDate = sdf.format(date1);

        for(int i=0; i<10; i++) {
            JSONObject obj1 = new JSONObject();
            obj1.put("boardNum" , i);
            obj1.put("spaceName" , "sn" + i );
            obj1.put("Category" , pc);
            obj1.put("price" , "price"  + i);
            obj1.put("regDate" , date1);
            listObj.add(obj1);

        }

        for(int i=0; i<listObj.size()-1; i++){
            array.add(listObj.get(i));
        }

        return array;
        }
}