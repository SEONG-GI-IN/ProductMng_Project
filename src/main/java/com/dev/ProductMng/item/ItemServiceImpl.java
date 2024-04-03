package com.dev.ProductMng.item;

import com.dev.ProductMng.common.CommonDAO;
import com.dev.ProductMng.config.APIException;
import com.dev.ProductMng.util.FileUtil;
import com.dev.ProductMng.util.StrUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    @Autowired
    ItemDAO itemDAO;

    @Autowired
    FileUtil fileUtil;

    @Autowired
    CommonDAO commonDAO;

    @Override
    public void insertItem(Map<String, Object> params) throws Exception{
        try{
            itemDAO.insertItem(params);
        } catch (Exception e){
            throw new Exception(e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getItemList(Map<String, Object> params) {
        try {
            return itemDAO.getItemList(params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getItemTypeList(Map<String, Object> params) {
        try {
            return itemDAO.getItemTypeList(params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getSupplierList(Map<String, Object> params) {
        try {
            return itemDAO.getSupplierList(params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void uploadItem(Map<String, Object> params) throws Exception {
        try {
            itemDAO.uploadItem(params);
    } catch (Exception e) {
        throw new Exception(e);
    }
}

    @Override
    public List<Map<String, Object>> uploadItemExcel(List<Map<String, Object>> dataList) {
        List<Map<String, Object>> result = new ArrayList();

        for(int i = 0; i <= dataList.size(); ++i) {
            if (i > 1) {
                Map<String, Object> cell = new HashMap();
                Map<String, Object> row = (Map)dataList.get(i - 1);
                if (row != null && row.get("C") != null && !"".equals(row.get("C"))) {

                    if (row.get("C") == null || String.valueOf(row.get("C")).equals("")) {
                        throw new APIException("ITEM001", "(" + (i + 1) + "번째줄) 바코드를 입력해주세요.");
                    }

                    if (row.get("D") == null || String.valueOf(row.get("D")).equals("")) {
                        throw new APIException("ITEM002", "(" + (i + 1) + "번째줄) 상품명을 입력해주세요.");
                    }

                    if (row.get("A") == null || String.valueOf(row.get("A")).equals("")) {
                        throw new APIException("ITEM003", "(" + (i + 1) + "번째줄) 상품분류를 입력해주세요.");
                    }

                    // 상품타입명으로 상품타입코드 조회 하여 result에 추가
                    Map<String, Object> itemTypeParams = new HashMap();
                    itemTypeParams.put("CODE_NM", row.get("A"));
                    itemTypeParams.put("UP_CODE_CD", "ITEM_TYPE");
                    Map<String, Object> itemType = commonDAO.getCodeCd(itemTypeParams);
                    cell.put("ITEM_TYPE_CD", itemType.get("CODE_CD"));
                    cell.put("ITEM_TYPE_NM", row.get("A"));

                    // 나머지 CELL 값 result에 추가
                    cell.put("BAR_CODE", row.get("C"));
                    cell.put("ITEM_NM", row.get("D"));
                    cell.put("ITEM_PRICE", row.get("M"));

                    result.add(cell);
                }
            }
        }
        return result;
    }

    @Override
    public void deleteItem(List<Map<String, Object>> list) throws Exception {
        try {
            itemDAO.deleteItem(list);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getItemStockList(Map<String, Object> params) {
        try {
            return itemDAO.getItemStockList(params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Map<String, Object>> uploadItemStockExcel(List<Map<String, Object>> dataList) {
        List<Map<String, Object>> result = new ArrayList();

        for(int i = 0; i <= dataList.size(); ++i) {
            if (i > 1) {
                Map<String, Object> cell = new HashMap();
                Map<String, Object> row = (Map)dataList.get(i - 1);
                if (row != null && row.get("A") != null && !"".equals(row.get("A"))) {

                    if (row.get("A") == null || String.valueOf(row.get("A")).equals("")) {
                        throw new APIException("ITEM001", "(" + (i + 1) + "번째줄) 입고일자를 입력해주세요.");
                    }

                    if (row.get("B") == null || String.valueOf(row.get("B")).equals("")) {
                        throw new APIException("ITEM002", "(" + (i + 1) + "번째줄) 바코드를 입력해주세요.");
                    }

                    if (row.get("C") == null || String.valueOf(row.get("C")).equals("")) {
                        throw new APIException("ITEM003", "(" + (i + 1) + "번째줄) 상품명을 입력해주세요.");
                    }

                    if (row.get("C") == null || String.valueOf(row.get("C")).equals("")) {
                        throw new APIException("ITEM003", "(" + (i + 1) + "번째줄) 거래처를 입력해주세요.");
                    }

                    if (row.get("D") == null || String.valueOf(row.get("D")).equals("")) {
                        throw new APIException("ITEM003", "(" + (i + 1) + "번째줄) 상품분류를 입력해주세요.");
                    }

                    if (row.get("E") == null || String.valueOf(row.get("E")).equals("")) {
                        throw new APIException("ITEM003", "(" + (i + 1) + "번째줄) 매입가를 입력해주세요.");
                    }

                    if (row.get("F") == null || String.valueOf(row.get("F")).equals("")) {
                        throw new APIException("ITEM003", "(" + (i + 1) + "번째줄) 입고량을 입력해주세요.");
                    }

                    // 거래처명으로 거래처코드 조회 하여 result에 추가
                    Map<String, Object> supplierParams = new HashMap();
                    supplierParams.put("CODE_NM", row.get("D"));
                    supplierParams.put("UP_CODE_CD", "SUPPLIER");
                    Map<String, Object> supplier = commonDAO.getCodeCd(supplierParams);
                    cell.put("SUPPLIER_CD", supplier.get("CODE_CD"));
                    cell.put("SUPPLIER", row.get("D"));

                    // 상품타입명으로 상품타입코드 조회 하여 result에 추가
                    Map<String, Object> itemTypeParams = new HashMap();
                    itemTypeParams.put("CODE_NM", row.get("E"));
                    itemTypeParams.put("UP_CODE_CD", "ITEM_TYPE");
                    Map<String, Object> itemType = commonDAO.getCodeCd(itemTypeParams);
                    cell.put("ITEM_TYPE_CD", itemType.get("CODE_CD"));
                    cell.put("ITEM_TYPE_NM", row.get("E"));

                    // 매입가는 row.get("E") 나누기 row.get("D") 값으로 result에 추가
                    int unit = (int) Double.parseDouble(String.valueOf(row.get("G")));
                    int purchasePrice = (int) Double.parseDouble(String.valueOf(row.get("F")));

                    purchasePrice = purchasePrice / unit;

                    // purchasePrice 소수점 절상
                    purchasePrice = (int) Math.round(purchasePrice / 10.0) * 10;

                    cell.put("PURCHASE_PRICE", purchasePrice);

                    // 나머지 CELL 값 result에 추가
                    cell.put("STOCK_DT", StrUtil.convertExponentToNumericString(String.valueOf(row.get("A"))));
                    cell.put("BAR_CODE", StrUtil.convertExponentToNumericString(String.valueOf(row.get("B"))));
                    cell.put("ITEM_NM", row.get("C"));
                    cell.put("IN_CNT", row.get("G"));

                    result.add(cell);
                }
            }
        }
        return result;
    }

    @Override
    public void uploadItemStock(Map<String, Object> rowData) {
        itemDAO.uploadItemStock(rowData);
    }

    @Override
    public void updateItemStock(List<Map<String, Object>> list) {

        // list에서 ITEM_NM, ITEM_TAG_NM1, ITEM_TAG_NM2는 다른 리스트에 담기
        List<Map<String, Object>> itemNmList = new ArrayList();

        for (int i = 0; i < list.size(); i++) {
            Map<String, Object> itemNm = new HashMap();

            itemNm.put("BAR_CODE", list.get(i).get("BAR_CODE"));
            itemNm.put("ITEM_NM", list.get(i).get("ITEM_NM"));
            itemNm.put("ITEM_TAG_NM1", list.get(i).get("ITEM_TAG_NM1"));
            itemNm.put("ITEM_TAG_NM2", list.get(i).get("ITEM_TAG_NM2"));
            itemNm.put("ITEM_TYPE_CD", list.get(i).get("ITEM_TYPE_CD"));
            itemNm.put("ITEM_TYPE_NM", list.get(i).get("ITEM_TYPE_NM"));
            itemNm.put("ITEM_PRICE", list.get(i).get("ITEM_PRICE"));
            itemNm.put("SAFE_REMAIN_CNT", list.get(i).get("SAFE_REMAIN_CNT"));
            itemNm.put("REMAIN_CHECK_YN", list.get(i).get("REMAIN_CHECK_YN"));

            itemNmList.add(itemNm);
        }
        this.updateItem(itemNmList);

        // list에서 나머지 값들은 ITEM_STOCK 테이블에 업데이트
        itemDAO.updateItemStock(list);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getItemSellList(Map<String, Object> params) {
        try {
            return itemDAO.getItemSellList(params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Map<String, Object>> uploadItemSellExcel(List<Map<String, Object>> dataList) {
        List<Map<String, Object>> result = new ArrayList();

        for (int i = 0; i <= dataList.size(); ++i) {
            if (i > 3) {
                Map<String, Object> cell = new HashMap();
                Map<String, Object> row = (Map) dataList.get(i - 1);
                if (row != null && row.get("B") != null && !"".equals(row.get("B")) && !"아이스크림".equals(row.get("D"))) {

                    cell.put("barCode", StrUtil.convertExponentToNumericString(String.valueOf(row.get("B"))));
                    cell.put("itemNm", row.get("C"));
                    cell.put("sellCnt", row.get("M"));

                    result.add(cell);
                }
            }
        }
        return result;
    }

    @Override
    public void uploadItemSell(Map<String, Object> rowData) {
        itemDAO.uploadItemSell(rowData);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getItemSmartList(Map<String, Object> params) {
        try {
            return itemDAO.getItemSmartList(params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateItem(List<Map<String, Object>> list) {
        itemDAO.updateItem(list);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getItemRemainList(Map<String, Object> params) {
        try {
            return itemDAO.getItemRemainList(params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateItemRemainCnt(List<Map<String, Object>> list) {

        List<Map<String, Object>> itemNmList = new ArrayList();

        for (int i = 0; i < list.size(); i++) {
            Map<String, Object> itemNm = new HashMap();

            if(!"".equals(list.get(i).get("SAFE_REMAIN_CNT")) && list.get(i).get("SAFE_REMAIN_CNT") != null) {
                itemNm.put("SAFE_REMAIN_CNT", list.get(i).get("SAFE_REMAIN_CNT"));
                itemNm.put("BAR_CODE", list.get(i).get("BAR_CODE"));
            } else {
                itemNm.put("SAFE_REMAIN_CNT", 0);
                itemNm.put("BAR_CODE", list.get(i).get("BAR_CODE"));
            }


            itemNmList.add(itemNm);
        }

        itemDAO.updateSafeRemainCnt(itemNmList);

        itemDAO.updateItemRemainCnt(list);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getCashFlowList(Map<String, Object> params) {
        try {
            return itemDAO.getCashFlowList(params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateItemDtl(Map<String, Object> params) {
        itemDAO.updateItemDtl(params);
    }

    @Override
    public void insertPriceTag(List<Map<String, Object>> list) {
        itemDAO.insertPriceTag(list);
    }

    @Override
    public Map<String, Object> getPriceTagList(Map<String, Object> params) {
        return itemDAO.getPriceTagList(params);
    }

    @Override
    public void deletePriceTag(List<Map<String, Object>> list) {
        itemDAO.deletePriceTag(list);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getItemBuyList(Map<String, Object> params) {
        try {
            return itemDAO.getItemBuyList(params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void insertItemBuyList() {
        itemDAO.insertItemBuyList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getItemNmList(Map<String, Object> params) {
        try {
            return itemDAO.getItemNmList(params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateItemBuyList(List<Map<String, Object>> list) {
        itemDAO.updateItemBuyList(list);
    }
}
