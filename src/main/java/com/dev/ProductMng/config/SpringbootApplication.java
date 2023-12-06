package com.dev.ProductMng.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.io.IOException;

@SpringBootApplication
@ComponentScan(basePackages = {"com.dev"})
public class SpringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootApplication.class, args);

        // 브라우저를 열기 위해 브라우저를 열 수 있는 명령어를 실행
        try {
            Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler http://localhost:8080/");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
