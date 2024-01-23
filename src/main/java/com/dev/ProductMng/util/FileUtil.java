package com.dev.ProductMng.util;

import com.dev.ProductMng.config.APIException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class FileUtil {

    public static List<String> readHeader(Row headerRow) {
        List<String> headers = new ArrayList<>();
        for (Cell cell : headerRow) {
            headers.add(getCellValue(cell));
        }
        return headers;
    }

    public static Map<String, Object> readDataRow(Row dataRow, List<String> headers) {
        Map<String, Object> rowData = new HashMap<>();
        for (int colIndex = 0; colIndex < dataRow.getLastCellNum(); colIndex++) {
            Cell cell = dataRow.getCell(colIndex);
            String header = headers.get(colIndex);
            String cellValue = getCellValue(cell);
            rowData.put(header, cellValue);
        }
        return rowData;
    }

    public static String getCellValue(Cell cell) {
        String value = "";
        switch (cell.getCellType()) {
            case FORMULA:
                value = cell.getCellFormula();
                break;
            case NUMERIC:
                value = String.valueOf(cell.getNumericCellValue());
                break;
            case STRING:
                value = cell.getStringCellValue();
                break;
            case BOOLEAN:
                value = String.valueOf(cell.getBooleanCellValue());
                break;
            case ERROR:
                value = String.valueOf(cell.getErrorCellValue());
                break;
            default:
                // 다른 경우에 대한 처리
                break;
        }
        return value;
    }

    public List<Map<String, Object>> getExcelContents(Map<String, MultipartFile> fileMap) {
        List<Map<String, Object>> list = new ArrayList();
        XSSFWorkbook workbook = null;
        FileInputStream fis = null;
        File excelFile = null;

        try {
            String filePath = "";
            fis = null;
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd", Locale.KOREA);
            Date today = new Date();
            String todayStr = sdf.format(today);
            String storagePath = "C:\\dev\\IntelliJ\\ProductMng\\src\\main\\resources\\static\\assets\\upload\\excel\\" + todayStr;
            File saveFolder = new File(storagePath);
            if ((!saveFolder.exists() || saveFolder.isFile()) && !saveFolder.mkdirs()) {
                throw new APIException("폴더 생성도중 에러발생");
            }

            MultipartFile file = (MultipartFile)fileMap.get("excelFile");
            String orginFileName = file.getOriginalFilename();
            int index = orginFileName.lastIndexOf(".");
            String fileExt = orginFileName.substring(index + 1);
            fileExt = fileExt.toLowerCase();
            SimpleDateFormat sdfCurrent = new SimpleDateFormat("yyyyMMddhhmmssSSS", Locale.KOREA);
            Timestamp ts = new Timestamp(System.currentTimeMillis());
            String currentTimeStr = sdfCurrent.format(ts.getTime());
            String newName = currentTimeStr + "." + fileExt;
            if (!"".equals(orginFileName)) {
                filePath = storagePath + File.separator + newName;
                file.transferTo(new File(filePath));
            }

            fis = new FileInputStream(filePath);
            workbook = new XSSFWorkbook(fis);
            XSSFSheet sheet = workbook.getSheetAt(0);

            for(int rowIndex = 0; rowIndex <= sheet.getPhysicalNumberOfRows(); ++rowIndex) {
                XSSFRow row = sheet.getRow(rowIndex);
                if (row != null) {
                    Map<String, Object> map = new HashMap();
                    Iterator<Cell> cellIterator = row.cellIterator();

                    while(cellIterator.hasNext()) {
                        Cell cell = (Cell)cellIterator.next();
                        String columnLetter = CellReference.convertNumToColString(cell.getColumnIndex());
                        map.put(columnLetter, this.getCellValue(cell));
                    }

                    list.add(map);
                }
            }

            if (workbook != null) {
                workbook.close();
            }

            if (fis != null) {
                fis.close();
            }

            excelFile = new File(filePath);
            if (excelFile.exists() && !excelFile.delete()) {
                throw new APIException("파일 삭제도중 에러발생");
            }
        } catch (IllegalStateException var35) {
            throw new APIException(var35.getMessage());
        } catch (IOException var36) {
            throw new APIException(var36.getMessage());
        } finally {
            try {
                if (workbook != null) {
                    workbook.close();
                }

                if (fis != null) {
                    fis.close();
                }
            } catch (IOException var34) {
                throw new APIException(var34.getMessage());
            }

        }

        return list;
    }

}