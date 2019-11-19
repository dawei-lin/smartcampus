package com.yihongda.smartcampus.config;

import com.yihongda.smartcampus.filter.LoginFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
    @Bean
    public FilterRegistrationBean registrationBean() {
        FilterRegistrationBean frs = new FilterRegistrationBean();
        frs.setFilter(new LoginFilter());
        frs.addUrlPatterns("/*");
        frs.setOrder(1);
        return frs;
    }
}
