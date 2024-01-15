package com.dev.ProductMng.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/item")
public class ItemController {

    @Autowired
    ItemService itemService;

    /**
     * 상품관리 조회 페이지
     * @return
     */
    @GetMapping("/itemListForm")
    public String itemListForm() {
        return "item/itemListForm.tiles";
    }

    /**
     * 상품 등록
     */
    @RequestMapping(value = ("/insertItem"), method = {RequestMethod.POST})
    @ResponseBody
    public boolean insertItem(@RequestParam Map<String, Object> params) {
        try {
            itemService.insertItem(params);
            return true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 상품 조회
     */
    @RequestMapping(value = ("/getItemList"), method = {RequestMethod.GET ,RequestMethod.POST})
    @ResponseBody
    public List<Map<String, Object>> getItemList(@RequestBody Map<String, Object> params) {
        try {
            return itemService.getItemList(params);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}