package com.dev.ProductMng.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/common")
public class CommonController {

    /**
     * 공통코드관리 화면
     */
    @GetMapping("/codeMngForm")
    public String codeMngForm() {
        return "common/codeMngForm.tiles";
    }
}
