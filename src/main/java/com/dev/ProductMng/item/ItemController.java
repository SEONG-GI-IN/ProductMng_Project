package com.dev.ProductMng.item;

import com.dev.ProductMng.util.FileUtil;
import com.dev.ProductMng.util.JsonUtil;
import com.dev.ProductMng.util.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
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
    @RequestMapping(value = ("/getItemList"), method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public Map<String, Object> getItemList(@RequestParam Map<String, Object> params) {
        try {
            PageUtil.setPaging(params);
            Map<String, Object> result = itemService.getItemList(params);
            Map<String, Object> data = new HashMap<>();

            data.put("contents", result.get("list"));

            Map<String, Object> pagination = new HashMap<>();
            pagination.put("page", params.get("page")); // 현재 페이지
            pagination.put("totalCount", result.get("total")); // 전체 개수
            data.put("pagination", pagination);

            result.put("data", data);
            result.put("result", true);

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            // 예외 처리를 적절히 수행하고, 에러 응답을 반환하거나 로깅합니다.
            return Collections.singletonMap("error", "An error occurred while processing the request.");
        }
    }


    /**
     * 상품 엑셀 업로드 기능
     * static/assets/templates/itemUploadFormTemplate.xlsx
     * poi 라이브러리 사용
     */
    @RequestMapping(value = ("/uploadItem"), method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public ModelAndView uploadItem (MultipartHttpServletRequest multi) throws Exception {
        Map<String, MultipartFile> fileMap = multi.getFileMap();
        List<Map<String, Object>> list = fileUtil.getExcelContents(fileMap);
        List<Map<String, Object>> dataList = itemService.uploadExcel(list);

        for (Map<String, Object> rowData : dataList) {
            itemService.uploadItem(rowData);
        }

        ModelAndView mav = new ModelAndView("jsonView");

        mav.addObject("result", "success");
        return mav;

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