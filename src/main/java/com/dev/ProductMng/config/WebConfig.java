//package com.dev.ProductMng.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.view.UrlBasedViewResolver;
//import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
//import org.springframework.web.servlet.view.tiles3.TilesView;
//
//
//@Configuration
//public class WebConfig {
//
//    @Bean
//    public TilesConfigurer tilesConfigurer() {
//        TilesConfigurer tilesConfigurer = new TilesConfigurer();
//        tilesConfigurer.setDefinitions(new String[] {"/WEB-INF/tiles/tiles.xml"});
//        tilesConfigurer.setCheckRefresh(true);
//        return tilesConfigurer;
//    }
//
//    @Bean
//    public UrlBasedViewResolver viewResolver() {
//        final UrlBasedViewResolver resolver = new UrlBasedViewResolver();
//        resolver.setViewClass(TilesView.class);
//        resolver.setOrder(1);
//        return resolver;
//    }
//}
