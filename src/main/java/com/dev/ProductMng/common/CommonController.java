package com.dev.ProductMng.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/common")
public class CommonController {

    @Autowired
    CommonService commonService;

    /**
     * 공통코드관리 화면
     */
    @GetMapping("/codeMngForm")
    public String codeMngForm() {
        return "common/codeMngForm.tiles";
    }

    /**
     * 그룹코드 조회
     */
    @RequestMapping(value = ("/getUpCodeList"), method = {RequestMethod.POST})
    @ResponseBody
    public List<Map<String, Object>> getUpCodeList(@RequestParam Map<String, Object> params) {
        try {
            return commonService.getUpCodeList(params);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 그룹코드 저장
     */
    @RequestMapping(value = ("/insertUpCode"), method = {RequestMethod.POST})
    @ResponseBody
    public boolean insertUpCode(@RequestParam Map<String, Object> params) {
        try {
            commonService.insertUpCode(params);
            return true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 코드 조회
     */
    @RequestMapping(value = ("/getCodeList"), method = {RequestMethod.POST})
    @ResponseBody
    public List<Map<String, Object>> getCodeList(@RequestParam Map<String, Object> params) {
        try {
            return commonService.getCodeList(params);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 코드 저장
     */
    @RequestMapping(value = ("/insertCode"), method = {RequestMethod.POST})
    @ResponseBody
    public boolean insertCode(@RequestParam Map<String, Object> params) {
        try {
            commonService.insertCode(params);
            return true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }
}
