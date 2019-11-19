package com.yihongda.smartcampus.util;


import com.alibaba.fastjson.JSONObject;
import com.yihongda.smartcampus.entity.BaiduTranslationContent;
import com.yihongda.smartcampus.entity.BaiduTranslationResult;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.List;

public class ExcelToTable {

    public static void main(String[] args) throws Exception {
        File directory = new File("C:\\Users\\Administrator\\Desktop\\报告易表格Excel");
        if (directory.exists()) {
            File[] files = directory.listFiles();
            if (files != null) {
                FileOutputStream fos = new FileOutputStream(new File("C:\\Users\\Administrator\\Desktop\\report_easy.sql"));
                for (int i = 0; i < files.length; i++) {
                    File file = files[i];
                    StringBuffer sb = new StringBuffer();
                    if (file.getName().toLowerCase().endsWith(".xls") || file.getName().toLowerCase().endsWith(".xlsx")) {
                        String fileName=file.getName().substring(0,file.getName().lastIndexOf("."));
                        int index=Integer.parseInt(fileName);
                        List<String> tiles = ExcelUtil.importExcel(new FileInputStream(file), file.getName(), 4);
                        String query = "";
                        for (int j = 1; j < tiles.size(); j++) {
                            String title = tiles.get(j);
                            if (StringUtils.isNotEmpty(query)) {
                                query += "\n" + title.replaceAll("[^\\u4E00-\\u9FA5]", "");
                            } else {
                                query += title.replaceAll("[^\\u4E00-\\u9FA5]", "");
                            }
                        }
                        BaiduTranslationResult baiduTranslationResult = JSONObject.parseObject(HttpClientUtil.singlePost(query), BaiduTranslationResult.class);
                        if (baiduTranslationResult != null && baiduTranslationResult.getTrans_result() != null && baiduTranslationResult.getTrans_result().size() > 0) {
                            sb.append("create table table" + index + "( id varchar(32) comment 'ID'");
                            for (BaiduTranslationContent content : baiduTranslationResult.getTrans_result()) {
                                String field = content.getDst().toLowerCase().replaceAll("[^a-zA-Z\\s]", "").replaceAll(" ","_");
                                while(field.length()>32){
                                    field=field.substring(0,field.lastIndexOf("_"));
                                }
                                sb.append("," + field + " varchar(100) comment '" + content.getSrc() + "'");
                            }
                            sb.append(") comment '" + tiles.get(0) + "';");
                        }
                    }
                    fos.write(sb.toString().getBytes());
                }
            }
        }
    }
}
