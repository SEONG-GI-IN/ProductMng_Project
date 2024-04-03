package com.dev.ProductMng.item;

import com.dev.ProductMng.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
    public List<Map<String, Object>> getItemList(@RequestBody Map<String, Object> params) {
        try {
            return itemService.getItemList(params);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    /**
     * 상품 엑셀 업로드 기능
     */
    @RequestMapping(value = ("/uploadItem"), method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public ModelAndView uploadItem (MultipartHttpServletRequest multi) throws Exception {
        Map<String, MultipartFile> fileMap = multi.getFileMap();
        List<Map<String, Object>> list = fileUtil.getExcelContents(fileMap);
        List<Map<String, Object>> dataList = itemService.uploadItemExcel(list);

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

    /**
     * 상품 List 수정
     */
    @RequestMapping(value = ("/updateItem"), method = {RequestMethod.POST})
    @ResponseBody
    public ModelAndView updateItem (@RequestParam Map<String, Object> params) throws Exception {
        ModelAndView mav = new ModelAndView("jsonView");
        try {
            List<Map<String, Object>> list = JsonUtil.convertToList(String.valueOf(params.get("list")));
            itemService.updateItem(list);
            mav.addObject("result", "success");
        } catch (Exception e) {
            mav.addObject("result", "fail");
            mav.addObject("message", e.getMessage());
        }
        return mav;
    }

    /**
     * 재고 관리 화면
     */
    @GetMapping("/itemStockListForm")
    public String itemStockListForm(Model model, @RequestParam Map<String, Object> params) throws Exception {
        model.addAttribute("itemTypeList", itemService.getItemTypeList(params));
        model.addAttribute("supplierList", itemService.getSupplierList(params));
        return "item/itemStockListForm.tiles";
    }

    /**
     * 입고 조회
     */
    @RequestMapping(value = ("/getItemStockList"), method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public List<Map<String, Object>> getItemStockList(@RequestBody Map<String, Object> params) {
        try {
            return itemService.getItemStockList(params);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 상품 입고 내역 엑셀 업로드 기능
     */
    @RequestMapping(value = ("/uploadItemStock"), method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public ModelAndView uploadItemStock (MultipartHttpServletRequest multi) throws Exception {
        Map<String, MultipartFile> fileMap = multi.getFileMap();
        List<Map<String, Object>> list = fileUtil.getExcelContents(fileMap);
        List<Map<String, Object>> dataList = itemService.uploadItemStockExcel(list);

        for (Map<String, Object> rowData : dataList) {
            itemService.uploadItemStock(rowData);
        }

        ModelAndView mav = new ModelAndView("jsonView");

        mav.addObject("result", "success");
        return mav;

    }

    /**
     * 상품 List 수정
     */
    @RequestMapping(value = ("/updateItemStock"), method = {RequestMethod.POST})
    @ResponseBody
    public ModelAndView updateItemStock (@RequestParam Map<String, Object> params) throws Exception {
        ModelAndView mav = new ModelAndView("jsonView");
        try {
            List<Map<String, Object>> list = JsonUtil.convertToList(String.valueOf(params.get("list")));
            itemService.updateItemStock(list);
            mav.addObject("result", "success");
        } catch (Exception e) {
            mav.addObject("result", "fail");
            mav.addObject("message", e.getMessage());
        }
        return mav;
    }

    /**
     * 재고 관리 화면
     */
    @GetMapping("/itemSellListForm")
    public String itemSellListForm(Model model, @RequestParam Map<String, Object> params) throws Exception {
        model.addAttribute("itemTypeList", itemService.getItemTypeList(params));
        model.addAttribute("supplierList", itemService.getSupplierList(params));
        return "item/itemSellListForm.tiles";
    }

    /**
     * 판매 내역 조회
     */
    @RequestMapping(value = ("/getItemSellList"), method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public List<Map<String, Object>> getItemSellList(@RequestBody Map<String, Object> params) {
        try {
            return itemService.getItemSellList(params);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 상품 판매 내역 엑셀 업로드 기능
     */
    @RequestMapping(value = ("/uploadItemSell"), method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public ModelAndView uploadItemSell (MultipartHttpServletRequest multi, @RequestParam Map<String, Object> params) throws Exception {
        Map<String, MultipartFile> fileMap = multi.getFileMap();

        List<Map<String, Object>> list = fileUtil.getExcelContents(fileMap);
        List<Map<String, Object>> dataList = itemService.uploadItemSellExcel(list);

        for (Map<String, Object> rowData : dataList) {
            rowData.put("startDt", params.get("startDt"));
            rowData.put("endDt", params.get("endDt"));
            itemService.uploadItemSell(rowData);
        }

        ModelAndView mav = new ModelAndView("jsonView");

        mav.addObject("result", "success");
        return mav;

    }

    /**
     * 상품 스마트 관리 화면
     */
    @GetMapping("/itemSmartListForm")
    public String itemSmartListForm(Model model, @RequestParam Map<String, Object> params) throws Exception {
        model.addAttribute("itemTypeList", itemService.getItemTypeList(params));
        model.addAttribute("supplierList", itemService.getSupplierList(params));
        return "item/itemSmartListForm.tiles";
    }

    /**
     * 상품 스마트 조회
     */
    @RequestMapping(value = ("/getItemSmartList"), method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public List<Map<String, Object>> getItemSmartList(@RequestBody Map<String, Object> params) {
        try {
            return itemService.getItemSmartList(params);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 가격표 hwp 생성 및 다운로드
     * html -> hwp 변환
     * @param params
     */
    @RequestMapping(value = ("/createPriceBoard"), method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public void createPriceBoard (@RequestParam Map<String, Object> params, HttpServletRequest request, HttpServletResponse response) throws Exception {
        fileUtil.createPriceBoard(params, request, response);
    }

    /**
     * 상품 스마트 관리 화면
     */
    @GetMapping("/itemRemainListForm")
    public String itemRemainListForm(Model model, @RequestParam Map<String, Object> params) throws Exception {
        model.addAttribute("itemTypeList", itemService.getItemTypeList(params));
        model.addAttribute("supplierList", itemService.getSupplierList(params));
        return "item/itemRemainListForm.tiles";
    }

    /**
     * 상품 재고 조회
     */
    @RequestMapping(value = ("/getItemRemainList"), method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public List<Map<String, Object>> getItemRemainList(@RequestBody Map<String, Object> params) {
        try {
            return itemService.getItemRemainList(params);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 상품 재고 조정
     */
    @RequestMapping(value = ("/updateItemRemainCnt"), method = {RequestMethod.POST})
    @ResponseBody
    public ModelAndView updateItemRemainCnt (@RequestParam Map<String, Object> params) throws Exception {
        ModelAndView mav = new ModelAndView("jsonView");
        try {
            List<Map<String, Object>> list = JsonUtil.convertToList(String.valueOf(params.get("list")));
            itemService.updateItemRemainCnt(list);
            mav.addObject("result", "success");
        } catch (Exception e) {
            mav.addObject("result", "fail");
            mav.addObject("message", e.getMessage());
        }
        return mav;
    }

    /**
     * 매입매출 관리 화면
     */
    @GetMapping("/cashFlowForm")
    public String cashFlowForm(Model model, @RequestParam Map<String, Object> params) throws Exception {
        model.addAttribute("itemTypeList", itemService.getItemTypeList(params));
        model.addAttribute("supplierList", itemService.getSupplierList(params));
        return "item/cashFlowForm.tiles";
    }

    /**
     * 매입매출 조회
     */
    @RequestMapping(value = ("/getCashFlowList"), method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public List<Map<String, Object>> getCashFlowList(@RequestBody Map<String, Object> params) {
        try {
            return itemService.getCashFlowList(params);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 상품 상세 정보 팝업 화면
     */
    @GetMapping("/itemDtlForm")
    public String itemDtlForm(Model model, @RequestParam Map<String, Object> params) throws Exception {
        model.addAttribute("params", params);
        model.addAttribute("itemTypeList", itemService.getItemTypeList(params));
        return "popup/itemDtlForm.tiles";
    }

    /**
     * 상품 상세 정보 저장
     */
    @RequestMapping(value = ("/updateItemDtl"), method = {RequestMethod.POST})
    @ResponseBody
    public ModelAndView updateItemDtl (@RequestParam Map<String, Object> params) throws Exception {
        ModelAndView mav = new ModelAndView("jsonView");
        try {
            itemService.updateItemDtl(params);
            mav.addObject("result", "success");
        } catch (Exception e) {
            mav.addObject("result", "fail");
            mav.addObject("message", e.getMessage());
        }
        return mav;
    }

    /**
     * 가격표 담기 눌렀을 때 저장
     */
    @RequestMapping(value = ("/insertPriceTag"), method = {RequestMethod.POST})
    @ResponseBody
    public ModelAndView insertPriceTag (@RequestParam Map<String, Object> params) throws Exception {
        ModelAndView mav = new ModelAndView("jsonView");
        try {
            List<Map<String, Object>> list = JsonUtil.convertToList(String.valueOf(params.get("list")));
            itemService.insertPriceTag(list);
            mav.addObject("result", "success");
        } catch (Exception e) {
            mav.addObject("result", "fail");
            mav.addObject("message", e.getMessage());
        }
        return mav;
    }

    /**
     * 가격표 담기 조회하기
     */
    @RequestMapping(value = ("/getPriceTagList"), method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public ModelAndView getPriceTagList(@RequestBody Map<String, Object> params, ModelAndView mv) {
        //PageUtil.setPaging(params);
        mv.addAllObjects(itemService.getPriceTagList(params));
        mv.setViewName("jsonView");
        return mv;
    }

    /**
     * 가격표 담기 삭제하기
     */
    @RequestMapping(value = ("/deletePriceTag"), method = {RequestMethod.POST})
    @ResponseBody
    public ModelAndView deletePriceTag (@RequestParam Map<String, Object> params) throws Exception {
        ModelAndView mav = new ModelAndView("jsonView");
        try {
            List<Map<String, Object>> list = JsonUtil.convertToList(String.valueOf(params.get("list")));
            itemService.deletePriceTag(list);
            mav.addObject("result", "success");
        } catch (Exception e) {
            mav.addObject("result", "fail");
            mav.addObject("message", e.getMessage());
        }
        return mav;
    }

    /**
     * 상품구매화면
     */
    @GetMapping("/itemBuyListForm")
    public String itemBuyForm(Model model, @RequestParam Map<String, Object> params) throws Exception {
        model.addAttribute("itemTypeList", itemService.getItemTypeList(params));
        model.addAttribute("supplierList", itemService.getSupplierList(params));
        return "item/itemBuyListForm.tiles";
    }

    /**
     * 상품구매 조회
     */
    @RequestMapping(value = ("/getItemBuyList"), method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public ModelAndView getItemBuyList(@RequestBody Map<String, Object> params, ModelAndView mv, Model model) {
        try {
            PageUtil.setPaging(params);
            model.addAttribute("itemTypeList", itemService.getItemTypeList(params));
            model.addAttribute("supplierList", itemService.getSupplierList(params));

            mv.addAllObjects(itemService.getItemBuyList(params));

            // mv에 "itemTypeList"와 "supplierList"가 포함되도록 설정
            mv.addObject("itemTypeList", model.asMap().get("itemTypeList"));
            mv.addObject("supplierList", model.asMap().get("supplierList"));

            mv.setViewName("jsonView");
            return mv;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * P_INSERT_ITEM_BUY_LIST 프로시져 호출
     */
    @RequestMapping(value = ("/insertItemBuyList"), method = {RequestMethod.POST})
    @ResponseBody
    public ModelAndView insertItemBuyList (@RequestParam Map<String, Object> params) throws Exception {
        ModelAndView mav = new ModelAndView("jsonView");
        try {
            itemService.insertItemBuyList();
            mav.addObject("result", "success");
        } catch (Exception e) {
            mav.addObject("result", "fail");
            mav.addObject("message", e.getMessage());
        }
        return mav;
    }

    /**
     * 상품명 검색어 자동완성 조회
     */
    @RequestMapping(value = ("/getItemNmList"), method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public List<Map<String, Object>> getItemNmList(@RequestBody Map<String, Object> params) {
        try {
            return itemService.getItemNmList(params);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 구매관리 수정
     */
    @RequestMapping(value = ("/updateItemBuyList"), method = {RequestMethod.POST})
    @ResponseBody
    public ModelAndView updateItemBuyList (@RequestBody Map<String, Object> params) throws Exception {
        ModelAndView mav = new ModelAndView("jsonView");
        try {
            List<Map<String, Object>> list = JsonUtil.convertToList(String.valueOf(params.get("list")));
            itemService.updateItemBuyList(list);
            mav.addObject("result", "success");
        } catch (Exception e) {
            mav.addObject("result", "fail");
            mav.addObject("message", e.getMessage());
        }
        return mav;
    }
}