package com.dev.ProductMng.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class indexController {

    @GetMapping("/")
    public String indexMapping() {
        return "index";
    }

    @RequestMapping(value = ("/test/test"), method = {RequestMethod.GET})
    public String test() {
        return "test/test";
    }

    @GetMapping("/test/list")
    public String testList() {
        return "test/list";
    }
}
