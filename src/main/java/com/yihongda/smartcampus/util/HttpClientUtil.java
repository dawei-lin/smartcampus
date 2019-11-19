package com.yihongda.smartcampus.util;


import com.alibaba.fastjson.JSON;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class HttpClientUtil {

    public static final String TRANS_API_HOST = "http://api.fanyi.baidu.com/api/trans/vip/translate";
    public static final String APPID = "20191114000356919";
    public static final String KEY = "dHuOAoKje7rZYJlQdU9K";

    /**
     * 返回集合对象
     *
     * @param url
     * @param p
     * @param clazz
     * @param <T>
     * @param <P>
     * @return
     */


    public static <T, P> List<T> postMethodToArrayJson(String url, P p, Class<T> clazz) {
        List<T> list = null;
        // 获得Http客户端(可以理解为:你得先有一个浏览器;注意:实际上HttpClient与浏览器是不一样的)
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        // 创建Post请求
        HttpPost httpPost = new HttpPost(url);
        // 我这里利用阿里的fastjson，将Object转换为json字符串;
        // (需要导入com.alibaba.fastjson.JSON包)
        String jsonString = JSON.toJSONString(p);
        StringEntity entity = new StringEntity(jsonString, "UTF-8");
        // post请求是将参数放在请求体里面传过去的;这里将entity放入post请求体中
        httpPost.setEntity(entity);
        httpPost.setHeader("Content-Type", "application/json;charset=utf8");
        // 响应模型
        CloseableHttpResponse response = null;
        try {
            // 由客户端执行(发送)Post请求
            response = httpClient.execute(httpPost);
            // 从响应模型中获取响应实体
            HttpEntity responseEntity = response.getEntity();
            //响应状态码为200且返回实体不为空
            if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK && responseEntity != null) {
                list = JSON.<T>parseArray(EntityUtils.toString(responseEntity), clazz);
            }
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                // 释放资源
                if (httpClient != null) {
                    httpClient.close();
                }
                if (response != null) {
                    response.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return list;
    }

    /**
     * 返回单个对象
     *
     * @param url
     * @param p
     * @param clazz
     * @param <T>
     * @param <P>
     * @return
     */


    public static <T, P> T postMethodToSingelJson(String url, P p, Class<T> clazz) {
        T t = null;
        // 获得Http客户端(可以理解为:你得先有一个浏览器;注意:实际上HttpClient与浏览器是不一样的)
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        // 创建Post请求
        HttpPost httpPost = new HttpPost(url);
        // 我这里利用阿里的fastjson，将Object转换为json字符串;
        // (需要导入com.alibaba.fastjson.JSON包)
        String jsonString = JSON.toJSONString(p);
        StringEntity entity = new StringEntity(jsonString, "UTF-8");
        // post请求是将参数放在请求体里面传过去的;这里将entity放入post请求体中
        httpPost.setEntity(entity);
        httpPost.setHeader("Content-Type", "application/json;charset=utf8");
        // 响应模型
        CloseableHttpResponse response = null;
        try {
            // 由客户端执行(发送)Post请求
            response = httpClient.execute(httpPost);
            // 从响应模型中获取响应实体
            HttpEntity responseEntity = response.getEntity();
            //响应状态码为200且返回实体不为空
            if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK && responseEntity != null) {
                t = JSON.<T>parseObject(EntityUtils.toString(responseEntity), clazz);
            }
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                // 释放资源
                if (httpClient != null) {
                    httpClient.close();
                }
                if (response != null) {
                    response.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return t;
    }

    public static <P> int postMethodJson(String url, P p) {
        // 获得Http客户端(可以理解为:你得先有一个浏览器;注意:实际上HttpClient与浏览器是不一样的)
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        // 创建Post请求
        HttpPost httpPost = new HttpPost(url);
        // 我这里利用阿里的fastjson，将Object转换为json字符串;
        // (需要导入com.alibaba.fastjson.JSON包)
        String jsonString = JSON.toJSONString(p);
        StringEntity entity = new StringEntity(jsonString, "UTF-8");
        // post请求是将参数放在请求体里面传过去的;这里将entity放入post请求体中
        httpPost.setEntity(entity);
        httpPost.setHeader("Content-Type", "application/json;charset=utf8");
        // 响应模型
        CloseableHttpResponse response = null;
        try {
            // 由客户端执行(发送)Post请求
            response = httpClient.execute(httpPost);
            //响应状态码为200且返回实体不为空
            return response.getStatusLine().getStatusCode();
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                // 释放资源
                if (httpClient != null) {
                    httpClient.close();
                }
                if (response != null) {
                    response.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return HttpStatus.SC_OK;
    }

    public static String singlePost(String query) {

        CloseableHttpClient hc = HttpClientBuilder.create().build();
        HttpPost httpPost = new HttpPost(TRANS_API_HOST);
        CloseableHttpResponse response;
        try {
            String salt = RandomStringUtils.randomNumeric(8);
            //appid+q+salt+密钥
            String sign = MD5Util.md5(APPID + query + salt + KEY);

            List<NameValuePair> params = new ArrayList<NameValuePair>();
            params.add(new BasicNameValuePair("q", query));
            params.add(new BasicNameValuePair("from", "auto"));
            params.add(new BasicNameValuePair("to", "en"));
            params.add(new BasicNameValuePair("appid", APPID));
            params.add(new BasicNameValuePair("salt", salt));
            params.add(new BasicNameValuePair("sign", sign));

            httpPost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
            response = hc.execute(httpPost);
            return EntityUtils.toString(response.getEntity());
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            httpPost.releaseConnection();
        }
        return null;
    }

    public static String getURL(String url, Map<String, String> paramMap) {
        StringBuffer params = new StringBuffer();
        // 字符数据最好encoding以下;这样一来，某些特殊字符才能传过去(如:某人的名字就是“&”,不encoding的话,传不过去)
        Set<Map.Entry<String, String>> entrySet = paramMap.entrySet();
        try {
            for (Map.Entry<String, String> entry : entrySet) {
                if (params.length() == 0) {
                    params.append(entry.getKey() + "=" + URLEncoder.encode(entry.getValue(), "utf-8"));
                } else {
                    params.append("&");
                    params.append(entry.getKey() + "=" + URLEncoder.encode(entry.getValue(), "utf-8"));
                }
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        url += "?" + params;
        return url;
    }
}
