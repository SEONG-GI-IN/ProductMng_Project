package com.dev.ProductMng.util;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MapUtil {

    public static List newList(Object... elememnts) {
        return Arrays.asList(elememnts);
    }

    public static Map<String, Object> newParamMap(String k, Object v) {
        Map<String, Object> p = new HashMap();
        return putKVs(p, k, v);
    }

    public static Map<String, Object> newParamMap(Map<String, Object> fromMap, String... keys) {
        Map<String, Object> p = new HashMap();
        return copyKVs(p, fromMap, keys);
    }

    public static Map<String, Object> kvPairsToMap(Object... keyValuePairs) {
        Map<String, Object> p = new HashMap();
        return putKVs(p, keyValuePairs);
    }

    public static Map<String, Object> copyKVs(Map<String, Object> fromMap, Map<String, Object> toMap, String... keys) {
        String[] var3 = keys;
        int var4 = keys.length;

        for(int var5 = 0; var5 < var4; ++var5) {
            String k = var3[var5];
            Object o = fromMap.get(k);
            toMap.put(k, o);
        }

        return toMap;
    }

    public static Map<String, Object> putKVs(Map<String, Object> map, Object... keyValuePairs) {
        for(int i = 0; i < keyValuePairs.length; i += 2) {
            String k = (String)keyValuePairs[i];
            Object v = keyValuePairs[i + 1];
            map.put(k, v);
        }

        return map;
    }

    public static Map<String, Object> replaceKeyName(Map<String, Object> map, String... oldAndNewNamePairs) {
        for(int i = 0; i < oldAndNewNamePairs.length; i += 2) {
            String oldK = oldAndNewNamePairs[i];
            String newK = oldAndNewNamePairs[i + 1];
            map.put(newK, map.get(oldK));
        }

        return map;
    }

    public static Map<String, Object> removeKVs(Map<String, Object> map, String... keys) {
        String[] var2 = keys;
        int var3 = keys.length;

        for(int var4 = 0; var4 < var3; ++var4) {
            String key = var2[var4];
            map.remove(key);
        }

        return map;
    }

    @SafeVarargs
    public static <T> T[] array(T... params) {
        return params;
    }

}
