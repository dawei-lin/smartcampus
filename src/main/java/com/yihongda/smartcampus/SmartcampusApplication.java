package com.yihongda.smartcampus;

import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.WebApplicationInitializer;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class SmartcampusApplication extends SpringBootServletInitializer implements WebApplicationInitializer {

    public static void main(String[] args) {
        SpringApplication.run(SmartcampusApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {

        return application.sources(SmartcampusApplication.class);
    }

    @Bean
    public HttpMessageConverters fastJsonHttpMessageConverters() {
        //1.需要定义一个convert转换消息的对象;  
        FastJsonHttpMessageConverter fastJsonHttpMessageConverter = new FastJsonHttpMessageConverter();
        //2处理ie浏览器保存数据时出现下载json数据问题  
        List<MediaType> fastMedisTypes = new ArrayList<>();
        //fastMedisTypes.add(MediaType.APPLICATION_JSON_UTF8);
        //fastMedisTypes.add(MediaType.TEXT_PLAIN);
        fastMedisTypes.add(new MediaType("text", "plain", Charset.forName("UTF-8")));
        //3.在convert中添加配置信息.  
        fastJsonHttpMessageConverter.setSupportedMediaTypes(fastMedisTypes);
        HttpMessageConverter<?> converter = fastJsonHttpMessageConverter;
        return new HttpMessageConverters(converter);
    }
}
