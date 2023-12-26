package com.dev.ProductMng.product.controller;

import com.dev.ProductMng.product.service.ProductService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductService productService;

    /**
     * 상품관리 조회 페이지
     * @return
     */
    @GetMapping("/productListForm")
    public String productListForm() {
        return "product/productListForm";
    }

    @RequestMapping(value = ("/search"), method = {RequestMethod.GET})
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

    /**
     * 상품 등록
     */
    @RequestMapping(value = ("/insertProduct"), method = {RequestMethod.POST})
    public void insertProduct(@RequestParam Map<String, Object> params) {
        try {
            productService.insertProduct(params);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}