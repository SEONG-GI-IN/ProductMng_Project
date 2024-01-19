package com.dev.ProductMng.item;

import com.dev.ProductMng.util.FileUtil;
import com.dev.ProductMng.util.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/item")
public class ItemController {

    @Autowired
    ItemService itemService;

    @Autowired
    FileUtil fileUtil;

    /**
     * 상품관리 조회 페이지
     * @return
     */
    @GetMapping("/itemListForm")
    public String itemListForm(Model model, @RequestParam Map<String, Object> params) throws Exception {
        model.addAttribute("itemTypeList", itemService.getItemTypeList(params));
        model.addAttribute("supplierList", itemService.getSupplierList(params));
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

    /**
     * 상품 엑셀 업로드 기능
     * static/assets/templates/itemUploadFormTemplate.xlsx
     * poi 라이브러리 사용
     */
    @RequestMapping(value = ("/uploadItem"), method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public boolean uploadItem (MultipartHttpServletRequest multi) throws Exception {
        Map<String, MultipartFile> fileMap = multi.getFileMap();
        List<Map<String, Object>> list = fileUtil.getExcelContents(fileMap);
        List<Map<String, Object>> dataList = itemService.uploadExcel(list);

        for (Map<String, Object> rowData : dataList) {
            itemService.uploadItem(rowData);
        }

        return true;

    }

    /**
     * 상품 List 삭제
     */
    @RequestMapping(value = ("/deleteItem"), method = {RequestMethod.POST})
    @ResponseBody
    public ModelAndView deleteItem (@RequestParam Map<String, Object> params) throws Exception {
        ModelAndView mav = new ModelAndView("jsonView");
        try {
            List<Map<String, Object>> list = JsonUtil.convertToList(String.valueOf(params.get("list")));
            itemService.deleteItem(list);
            mav.addObject("result", "success");
        } catch (Exception e) {
            mav.addObject("result", "fail");
            mav.addObject("message", e.getMessage());
        }
        return mav;
    }
}