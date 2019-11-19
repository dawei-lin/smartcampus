package com.yihongda.smartcampus.controller;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.yihongda.smartcampus.entity.*;
import com.yihongda.smartcampus.enums.ReturnCodeType;
import com.yihongda.smartcampus.message.CommonResult;
import com.yihongda.smartcampus.service.SchoolInfoService;
import com.yihongda.smartcampus.service.UserInfoService;
import com.yihongda.smartcampus.service.UserService;
import com.yihongda.smartcampus.util.CusAccessObjectUtil;
import com.yihongda.smartcampus.util.JwtTokenUtil;
import com.yihongda.smartcampus.util.MD5Util;
import com.yihongda.smartcampus.util.VerifyCodeUtil;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/userInfo")
@Api("用户信息")
public class UserInfoController {
    Logger logger = LoggerFactory.getLogger(UserInfoController.class);
    @Autowired
    private UserInfoService userInfoService;
    @Autowired
    private SchoolInfoService schoolInfoService;
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @ApiOperation("用户注册")
    public CommonResult register(@Valid UserInfo userInfo, HttpServletRequest request) {
        if (!StringUtils.isNotEmpty(userInfo.getVerifycode()) || !userInfo.getVerifycode().equals(request.getSession().getAttribute("verifyCode"))) {
            return new CommonResult(ReturnCodeType.VERIFY_CODE_ERROR.getStringCode(), ReturnCodeType.VERIFY_CODE_ERROR.getMsg());
        }
        if (userInfoService.getCountByUserName(userInfo.getUsername()) > 0) {
            return new CommonResult(ReturnCodeType.NAME_REPEAT.getStringCode(), ReturnCodeType.NAME_REPEAT.getMsg());
        }
        if (schoolInfoService.getCountBySchoolId(userInfo.getSchoolid()) <= 0) {
            return new CommonResult(ReturnCodeType.SCHOOL_NO_EXIST.getStringCode(), ReturnCodeType.SCHOOL_NO_EXIST.getMsg());
        }
        userInfo.setCreatetime(new Date());
        userInfo.setCreateip(CusAccessObjectUtil.getIpAddress(request));
        userInfo.setStatus(-1);
        userInfo.setPassword(MD5Util.md5(userInfo.getPassword()));
        if (userInfoService.saveUserInfo(userInfo) <= 0) {
            return new CommonResult().fail();
        }
        return new CommonResult().success();
    }

    @PostMapping("/login")
    @ApiOperation("用户登录")
    public CommonResult login(@Valid UserInfoLogin userInfo, HttpServletRequest request, HttpServletResponse response) {
        /*System.out.println(userInfo.getVerifycode());
        System.out.println(request.getSession().getAttribute("verifyCode"));*/
        if (!StringUtils.isNotEmpty(userInfo.getVerifycode()) || !userInfo.getVerifycode().equals(request.getSession().getAttribute("verifyCode"))) {
            return new CommonResult(ReturnCodeType.VERIFY_CODE_ERROR.getStringCode(), ReturnCodeType.VERIFY_CODE_ERROR.getMsg());
        }
        request.getSession().removeAttribute("verifyCode");
        LoginSuccessInfo loginSuccessInfo = userInfoService.getLoginInfoByUserNameAndPassword(userInfo.getUsername(), MD5Util.md5(userInfo.getPassword()));
        if (loginSuccessInfo != null && StringUtils.isNotEmpty(loginSuccessInfo.getId())) {
            Map<String, Object> claims = new HashMap<>();
            claims.put(Claims.SUBJECT, userInfo.getUsername());
            claims.put("ID", loginSuccessInfo.getId());
            claims.put("SCHOOL_ID", loginSuccessInfo.getSchoolid());
            String token = JwtTokenUtil.generateToken(claims);
            Cookie cookie = new Cookie("token", token);
            cookie.setPath(request.getContextPath());
            cookie.setMaxAge(60 * 60 * 24);
            response.addCookie(cookie);
            String msg = JSONObject.toJSONString(loginSuccessInfo, SerializerFeature.WriteMapNullValue);
            return new CommonResult("200", msg);
        }
        return new CommonResult().fail();
    }

    @GetMapping("/verifyCode")
    @ApiOperation("获取验证码")
    public void getVerifyCode(HttpServletResponse response, HttpServletRequest request) {
        try {
            int width = 200;
            int height = 69;
            BufferedImage verifyImg = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            //生成对应宽高的初始图片
            String randomText = VerifyCodeUtil.drawRandomText(width, height, verifyImg);
            //单独的一个类方法，出于代码复用考虑，进行了封装。
            //功能是生成验证码字符并加上噪点，干扰线，返回值为验证码字符
            request.getSession().setAttribute("verifyCode", randomText);
            System.out.println(request.getSession().getAttribute("verifyCode"));
            response.setContentType("image/png");//必须设置响应内容类型为图片，否则前台不识别
            OutputStream os = response.getOutputStream(); //获取文件输出流
            ImageIO.write(verifyImg, "png", os);//输出图片流
            os.flush();
            os.close();//关闭流
        } catch (IOException e) {
            logger.error(e.getMessage());
            e.printStackTrace();

        }
    }

    @PostMapping("/verifyCode")
    @ApiOperation("校验验证码")
    public CommonResult checkVerifyCode(HttpServletRequest request, String verifycode) {
        if (StringUtils.isNotEmpty(verifycode) && verifycode.equals(request.getSession().getAttribute("verifyCode"))) {
            return new CommonResult().success();
        }
        request.getSession().removeAttribute("verifyCode");
        return new CommonResult().fail();
    }

    @GetMapping("/logout")
    @ApiOperation("登出")
    public void logout(HttpServletRequest request, HttpServletResponse response) throws Exception{
        Cookie cookie = new Cookie("token", null);//cookie名字要相同
        cookie.setMaxAge(0); //
        cookie.setPath(request.getContextPath());  // 相同路径
        response.addCookie(cookie);
        response.sendRedirect("/smartcampus/login.html");
    }

    @PutMapping("/personalInfo")
    @ApiOperation("编辑个人信息")
    public CommonResult updatePersonalInfo(User user) {
        if (StringUtils.isNotEmpty(user.getUsername()) && user.getUsername().length() > 20) {
            return new CommonResult(ReturnCodeType.PARAMETER_INVALID.getStringCode(), "账号长度不符合要求");
        }
        if (StringUtils.isNotEmpty(user.getTel()) && user.getTel().length() != 11) {
            return new CommonResult(ReturnCodeType.PARAMETER_INVALID.getStringCode(), "手机号长度不符合要求");
        }
        if (StringUtils.isNotEmpty(user.getRealname()) && user.getRealname().length() > 20) {
            return new CommonResult(ReturnCodeType.PARAMETER_INVALID.getStringCode(), "名字长度不符合要求");
        }
        if (userService.getCountByIdAndUserName(user.getId(), user.getUsername()) > 0) {
            return new CommonResult(ReturnCodeType.NAME_REPEAT.getStringCode(), ReturnCodeType.NAME_REPEAT.getMsg());
        }
        if (userService.updatePersonalInfo(user) > 0) {
            return new CommonResult().success();
        } else {
            return new CommonResult().fail();
        }
    }

    @GetMapping("/permission")
    public List<Permission> getPermissionTree(HttpServletRequest request) {
        return userInfoService.getPermissionTree((String) request.getAttribute("id"), (String) request.getAttribute("schoolId"));
    }
}
