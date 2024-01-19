package com.dev.ProductMng.util;

import java.math.BigDecimal;

public class StrUtil {

    /**
     * 숫자를 지수표기법으로 변환
     */
    public static String convertExponentToNumericString(String exponentNotation) {
        BigDecimal bigDecimal = new BigDecimal(exponentNotation);
        return bigDecimal.toPlainString();
    }
}
