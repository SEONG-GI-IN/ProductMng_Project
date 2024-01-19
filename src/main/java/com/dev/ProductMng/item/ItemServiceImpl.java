package com.dev.ProductMng.item;

import com.dev.ProductMng.common.CommonDAO;
import com.dev.ProductMng.config.APIException;
import com.dev.ProductMng.util.FileUtil;
import com.dev.ProductMng.util.StrUtil;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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
    public void itemUpload(Map<String, Object> params) throws Exception {
        try {
            itemDAO.itemUpload(params);
    } catch (Exception e) {
        throw new Exception(e);
    }
}

    @Override
    public List<Map<String, Object>> uploadExcel(List<Map<String, Object>> dataList) throws Exception {
        List<Map<String, Object>> result = new ArrayList();

        for(int i = 0; i <= dataList.size(); ++i) {
            if (i > 2) {
                Map<String, Object> cell = new HashMap();
                Map<String, Object> row = (Map)dataList.get(i - 1);
                if (row != null && row.get("A") != null && !"".equals(row.get("A"))) {
                    if (row.get("A") == null || String.valueOf(row.get("A")).equals("")) {
                        throw new APIException("ITEM001", "(" + (i + 1) + "번째줄) 바코드를 입력해주세요.");
                    }

                    if (row.get("B") == null || String.valueOf(row.get("B")).equals("")) {
                        throw new APIException("ITEM002", "(" + (i + 1) + "번째줄) 상품명을 입력해주세요.");
                    }

                    if (row.get("C") == null || String.valueOf(row.get("C")).equals("")) {
                        throw new APIException("ITEM003", "(" + (i + 1) + "번째줄) 거래처를 입력해주세요.");
                    }

                    if (row.get("D") == null || String.valueOf(row.get("D")).equals("")) {
                        throw new APIException("ITEM004", "(" + (i + 1) + "번째줄) 상품타입을 입력해주세요.");
                    }

                    if (row.get("E") == null || String.valueOf(row.get("E")).equals("")) {
                        throw new APIException("ITEM005", "(" + (i + 1) + "번째줄) 매입가를 입력해주세요.");
                    }

                    // 매입가 숫자 체크
//                    if (!String.valueOf(row.get("E")).matches("^[0-9]*$")) {
//                        throw new APIException("ITEM006", "(" + (i + 1) + "번째줄) 매입가는 숫자만 입력 가능합니다.");
//                    }

                    // A열을 지수 표기법으로 변경
                    String barcodeValue = StrUtil.convertExponentToNumericString((String) row.get("A"));
                    cell.put("BAR_CODE", barcodeValue);

                    // 거래처명으로 거래처코드 조회 하여 result에 추가
                    Map<String, Object> supplierParams = new HashMap();
                    supplierParams.put("CODE_NM", row.get("C"));
                    supplierParams.put("UP_CODE_CD", "SUPPLIER");
                    Map<String, Object> supplier = commonDAO.getCodeCd(supplierParams);
                    cell.put("SUPPLIER_CD", supplier.get("CODE_CD"));

                    // 상품타입명으로 상품타입코드 조회 하여 result에 추가
                    Map<String, Object> itemTypeParams = new HashMap();
                    itemTypeParams.put("CODE_NM", row.get("D"));
                    itemTypeParams.put("UP_CODE_CD", "ITEM_TYPE");
                    Map<String, Object> itemType = commonDAO.getCodeCd(itemTypeParams);
                    cell.put("ITEM_TYPE_CD", itemType.get("CODE_CD"));

                    // 나머지 CELL 값 result에 추가
                    cell.put("ITEM_NM", row.get("B"));
                    cell.put("PURCHASE_PRICE", row.get("E"));

                    result.add(cell);
                }
            }
        }
        return result;
    }
}
