package com.dev.ProductMng.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.UrlBasedViewResolver;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesView;


@Configuration
public class WebConfig {

    @Bean
    public TilesConfigurer tilesConfigurer() {
        TilesConfigurer tilesConfigurer = new TilesConfigurer();

        // Tiles 설정 파일(tiles.xml)의 위치를 설정
        tilesConfigurer.setDefinitions(new String[] {"/WEB-INF/tiles/tiles.xml"});
        // 설정을 리프레시할지 여부를 설정 (true로 설정 시 변경된 내용이 반영됨)
        tilesConfigurer.setCheckRefresh(true);

        return tilesConfigurer;
    }

    @Bean
    public UrlBasedViewResolver viewResolver() {
        final UrlBasedViewResolver resolver = new UrlBasedViewResolver();
        // 뷰 클래스를 TilesView로 설정
        resolver.setViewClass(TilesView.class);
        // 뷰 리졸버의 우선순위를 설정 (숫자가 낮을수록 우선순위가 높음)
        resolver.setOrder(1);
        return resolver;
    }

    //jsonView
    // setViewName("jsonView")로 설정한 경우
    @Bean
    public View jsonView() {
        return new MappingJackson2JsonView();
    }
}