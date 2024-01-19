package com.dev.ProductMng.util;

import java.math.BigDecimal;

public class StrUtil {

    /**
     * 지수표기법을 숫자로 변환
     */
    public static String convertExponentToNumericString(String exponentNotation) {
        BigDecimal bigDecimal = new BigDecimal(exponentNotation);
        return bigDecimal.toPlainString();
    }
}
