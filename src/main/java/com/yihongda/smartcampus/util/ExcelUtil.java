package com.yihongda.smartcampus.util;

import cn.afterturn.easypoi.excel.ExcelImportUtil;
import cn.afterturn.easypoi.excel.entity.ImportParams;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

public class ExcelUtil {
    public static <T> List<T> importExcel(MultipartFile file, Integer titleRows, Integer headerRows, Class<T> pojoClass) throws Exception {
        if (file == null) {
            return null;
        }
        ImportParams params = new ImportParams();
        params.setTitleRows(titleRows);
        params.setHeadRows(headerRows);
        List<T> list = null;
        try {
            list = ExcelImportUtil.importExcel(file.getInputStream(), pojoClass, params);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException("excel文件不能为空");
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
        return list;
    }

    public static List<String> importExcel(InputStream in, String fileName, int beginLine) {
        Workbook wb = null;
        try {
            if (fileName.toLowerCase().endsWith("xls")) {
                wb = new HSSFWorkbook(in);
            } else {
                wb = new XSSFWorkbook(in);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        List<String> titles = new ArrayList<>();
        Sheet sheet = wb.getSheetAt(0);
        Row row = sheet.getRow(0);
        Cell cell = null;
        int index = 0;
        while (cell == null || !StringUtils.isNotEmpty(cell.getStringCellValue())) {
            cell = row.getCell(index++);
        }
        titles.add(cell.getStringCellValue());

        int line = beginLine - 1;
        row = sheet.getRow(line);
        if (row != null) {
            index = 0;
            cell = row.getCell(index);
            while (cell != null&&StringUtils.isNotEmpty(cell.getStringCellValue())) {
                titles.add(cell.getStringCellValue());
                cell = row.getCell(++index);
            }
        }
        if(titles.size()==1){
            row=sheet.getRow(line-1);
            if (row != null) {
                index = 0;
                cell = row.getCell(index);
                while (cell != null&&StringUtils.isNotEmpty(cell.getStringCellValue())) {
                    titles.add(cell.getStringCellValue());
                    cell = row.getCell(++index);
                }
            }
        }
        return titles;
    }
}
