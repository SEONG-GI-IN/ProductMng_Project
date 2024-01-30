package com.dev.ProductMng.config.handler;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

public class DateTimeCustomFormatter {

    public static List<Map<String, Object>> DateTimeCustomFormatter(List<Map<String, Object>> list, String[] rowNames, String pattern) {
        for (String rowName : rowNames) {
            for (Map<String, Object> row : list) {
                Object dateTimeValue = row.get(rowName);
                if (dateTimeValue != null) {
                    LocalDateTime ldt;
                    try {
                        // 초 포함
                        ldt = LocalDateTime.parse(dateTimeValue.toString(), DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"));
                    } catch (Exception e) {
                        // 초 미포함
                        ldt = LocalDateTime.parse(dateTimeValue.toString(), DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm"));
                    }
                    String formattedDateTime = ldt.format(DateTimeFormatter.ofPattern(pattern));
                    row.put(rowName, formattedDateTime);
                }
            }
        }
        return list;
    }
}