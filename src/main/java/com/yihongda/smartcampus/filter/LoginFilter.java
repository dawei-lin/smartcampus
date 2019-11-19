package com.yihongda.smartcampus.filter;

import com.yihongda.smartcampus.util.JwtTokenUtil;
import io.jsonwebtoken.Claims;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

public class LoginFilter extends OncePerRequestFilter {
    Logger logger = LoggerFactory.getLogger(LoginFilter.class);
    List<String> passUrlList;

    public LoginFilter() {
        passUrlList = new ArrayList<>();
        passUrlList.add("/userInfo/register");
        passUrlList.add("/userInfo/login");
        passUrlList.add("/userInfo/verifyCode");
        passUrlList.add("/schoolInfo/schoolInfoList");
        passUrlList.add("/login.html");
        passUrlList.add("/register.html");
        passUrlList.add("/swagger-ui.html");
        passUrlList.add("/webjars");
        passUrlList.add("/swagger");
        passUrlList.add("/swagger-resources");
        passUrlList.add("/v2");
        passUrlList.add("/static");
        passUrlList.add("/css");
        passUrlList.add("/script");
        passUrlList.add("/images");
        passUrlList.add("/jquery");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        if (!isPassUrl(request)) {
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if ("token".equals(cookie.getName()) && StringUtils.isNotEmpty(cookie.getValue())) {
                        String token = cookie.getValue();
                        Claims claims = JwtTokenUtil.getClaimsFromToken(token);
                        if (claims != null && !JwtTokenUtil.isTokenExpired(token)) {
                            logger.info("用户登录成功");
                            if (claims.getExpiration().getTime() - System.currentTimeMillis() < 1800L * 1000) {
                                token = JwtTokenUtil.refreshToken(token);
                                Cookie cook = new Cookie("token", token);
                                cook.setPath(request.getContextPath());  // 相同路径
                                cook.setMaxAge(60 * 60 * 24);
                                response.addCookie(cook);
                            }
                            request.setAttribute("id", claims.get("ID"));
                            request.setAttribute("schoolId", claims.get("SCHOOL_ID"));
                            request.setAttribute("userName", claims.getSubject());
                            chain.doFilter(request, response);
                            return;
                        } else {
                            request.setCharacterEncoding("UTF-8");
                            response.setCharacterEncoding("UTF-8");
                            Cookie cook = new Cookie("token", null);//cookie名字要相同
                            cook.setMaxAge(0); //
                            cook.setPath(request.getContextPath());  // 相同路径
                            response.addCookie(cook);
                            PrintWriter writer = response.getWriter();
                            StringBuffer sb = new StringBuffer();
                            sb.append("<script type=\"text/javascript\">");
                            sb.append("parent.window.top.location.href='");
                            sb.append("/smartcampus/login.html");
                            sb.append("';");
                            sb.append("</script>");
                            writer.append(sb);
                            return;
                        }
                    }
                }
            }
            request.setCharacterEncoding("UTF-8");
            response.setCharacterEncoding("UTF-8");
            PrintWriter writer = response.getWriter();
            StringBuffer sb = new StringBuffer();
            sb.append("<script type=\"text/javascript\">");
            sb.append("parent.window.top.location.href='");
            sb.append("/smartcampus/login.html");
            sb.append("';");
            sb.append("</script>");
            writer.append(sb);
            return;
        } else {
            chain.doFilter(request, response);
        }
    }

    public boolean isPassUrl(HttpServletRequest request) {
        for (String url : passUrlList) {
            if (request.getRequestURI().contains(url)) {
                return true;
            }
        }
        return false;
    }
}
