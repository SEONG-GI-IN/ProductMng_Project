package com.dev.ProductMng;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@SpringBootApplication
public class ProductMngApplication {
	static Logger log = LoggerFactory.getLogger(ProductMngApplication.class);
	public static void main(String[] args) {

		SpringApplication.run(ProductMngApplication.class, args);

		// 브라우저를 열기 위해 브라우저를 열 수 있는 명령어를 실행
//		try {
//			Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler http://localhost:8082/");
//		} catch (IOException e) {
//			log.warn("자동으로 브라우저를 실행할 수 없습니다.");
//		}
	}

}
