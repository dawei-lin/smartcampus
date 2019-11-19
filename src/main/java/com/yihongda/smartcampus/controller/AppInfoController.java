package com.yihongda.smartcampus.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.yihongda.smartcampus.entity.*;
import com.yihongda.smartcampus.enums.MessageCommunicateType;
import com.yihongda.smartcampus.enums.ReturnCodeType;
import com.yihongda.smartcampus.message.CommonResult;
import com.yihongda.smartcampus.message.ExceptionResult;
import com.yihongda.smartcampus.service.*;
import com.yihongda.smartcampus.util.AESUtil;
import com.yihongda.smartcampus.util.HttpClientUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/appInfo")
@Api("应用信息")
public class AppInfoController {
    @Autowired
    private AppInfoService appInfoService;
    @Autowired
    private AppTypeService appTypeService;
    @Autowired
    private UserService userService;
    @Autowired
    private SchoolInfoService schoolInfoService;
    @Autowired
    private RoleInfoService roleInfoService;

    @Value("${file.store.commonPath}")
    private String commonPath;

    @Value("${file.store.savePath}")
    private String savePath;


    @PostMapping("")
    @ApiOperation("添加应用")
    public CommonResult saveAppInfo(@Valid AppInfo appInfo, MultipartFile upfile_applogo) {
        if (appInfoService.getCountByAppName(appInfo.getAppname()) > 0) {
            return new CommonResult(ReturnCodeType.NAME_REPEAT.getStringCode(), ReturnCodeType.NAME_REPEAT.getMsg());
        }
        if (upfile_applogo != null) {
            String filePath = commonPath;
            File path = new File(filePath);
            if (!path.exists()) {
                path.mkdirs();
            }
            String fileName = UUID.randomUUID().toString() + upfile_applogo.getOriginalFilename().substring(upfile_applogo.getOriginalFilename().lastIndexOf("."));
            if (!filePath.endsWith(File.separator)) {
                filePath += File.separator;
            }
            File newFile = new File(filePath + fileName);
            try {
                upfile_applogo.transferTo(newFile);
            } catch (IOException e) {
                e.printStackTrace();
                return new ExceptionResult(e);
            }
            if (StringUtils.isNotEmpty(upfile_applogo.getOriginalFilename())) {
                appInfo.setApplogo(savePath + fileName);
            }
        }
        appInfo.setStatus(1);
        appInfo.setAccesstime(new Date());
        appInfo.setAccesstype(1);
        if (appInfoService.saveAppInfo(appInfo) <= 0) {
            return new CommonResult().fail();
        }
        return new CommonResult().success();
    }

    @PostMapping("/updateAppInfo")
    @ApiOperation("更新应用")
    public CommonResult updateAppInfo(@Valid AppInfo appInfo, MultipartFile upfile_applogo) {
        if (appInfoService.getCountByIdAndAppName(appInfo.getId(), appInfo.getAppname()) > 0) {
            return new CommonResult(ReturnCodeType.NAME_REPEAT.getStringCode(), ReturnCodeType.NAME_REPEAT.getMsg());
        }
        if (upfile_applogo != null) {
            String filePath = commonPath;
            File path = new File(filePath);
            if (!path.exists()) {
                path.mkdirs();
            }
            String fileName = "";
            if (StringUtils.isNotEmpty(upfile_applogo.getOriginalFilename())) {
                fileName = UUID.randomUUID().toString() + upfile_applogo.getOriginalFilename().substring(upfile_applogo.getOriginalFilename().lastIndexOf("."));
                if (!filePath.endsWith(File.separator)) {
                    filePath += File.separator;
                }
                File newFile = new File(filePath + fileName);
                try {
                    upfile_applogo.transferTo(newFile);
                } catch (IOException e) {
                    e.printStackTrace();
                    return new ExceptionResult(e);
                }
                appInfo.setApplogo(savePath + fileName);
            }
        }
        if (appInfoService.updateAppInfo(appInfo) <= 0) {
            return new CommonResult().fail();
        }
        return new CommonResult().success();
    }

    @PostMapping("/status")
    @ApiOperation("更新应用状态")
    public CommonResult changeAppStatus(AppInfo appInfo) {
        if (appInfoService.updateAppInfoStatus(appInfo) > 0) {
            return new CommonResult().success();
        } else {
            return new CommonResult().fail();
        }
    }

    @GetMapping("getAppInfo/{id}")
    @ApiOperation("根据id获取应用")
    public AppInfo getAppInfo(@PathVariable String id) {
        return appInfoService.getAppInfoById(id);
    }

    @PostMapping("deleteAppInfo/{id}")
    @ApiOperation("删除应用")
    public CommonResult deleteAppInfo(@PathVariable String id) {
        if (appInfoService.deleteAppInfo(id) > 0) {
            return new CommonResult().success();
        } else {
            return new CommonResult().fail();
        }
    }

    @GetMapping("/appInfoListByParam")
    @ApiOperation("根据参数查询应用")
    public List<AppInfo> getAppInfoListByParam(AppInfoParam appInfoParam) {
        if (appInfoParam != null && appInfoParam.getPagenum() != null && appInfoParam.getPagesize() != null) {
            PageHelper.startPage(appInfoParam.getPagenum(), appInfoParam.getPagesize());
        }
        return appInfoService.getAppInfoListByParam(appInfoParam);
    }

    @GetMapping("/pageCount")
    @ApiOperation("查询总页数")
    public Integer getPageCount(@RequestBody(required = false) AppInfoParam appInfoParam) {
        int appCount = appInfoService.getAppCount(appInfoParam);
        if (appInfoParam.getPagesize() == null) {
            appInfoParam.setPagesize(10);
        }
        int pageNum = 0;
        if (appCount > 0) {
            if (appCount % appInfoParam.getPagesize() == 0) {
                pageNum = appCount / appInfoParam.getPagesize();
            } else {
                pageNum = appCount / appInfoParam.getPagesize() + 1;
            }
        }
        return pageNum;
    }

    @GetMapping("/appInfoList")
    @ApiOperation("获取应用信息")
    public List<AppInfoResponse> getAppInfoList(HttpServletRequest request) {
        List<AppInfoResponse> appInfoResponseList = new ArrayList<>();
        List<AppType> appTypeList = appTypeService.getAppTypeList((String) request.getAttribute("schoolId"));
        if (appTypeList != null) {
            for (AppType appType : appTypeList) {
                List<AppInfo> appInfoList = appInfoService.getAppInfoListByAppType(appType.getId());
                if (appInfoList != null && appInfoList.size() > 0) {
                    AppInfoResponse appInfoResponse = new AppInfoResponse();
                    appInfoResponse.setTname(appType.getTname());
                    appInfoResponse.setChildren(appInfoList);
                    appInfoResponseList.add(appInfoResponse);
                }
            }
            return appInfoResponseList;
        }
        return appInfoResponseList;
    }

    @GetMapping("/informationCenter")
    @ApiOperation("获取消息中心")
    public List<AppInfo> getInformationCenter() {
        return appInfoService.getInformationCenter();
    }

    @GetMapping("/useApp")
    @ApiOperation("获取用户使用的app")
    public List<AppInfo> getUseApp(HttpServletRequest request) {
        String uid = (String) request.getAttribute("id");
        return appInfoService.getUseApp(uid);
    }

    @GetMapping("commonUseApp")
    @ApiOperation("获取用户常用app")
    public List<AppInfo> getCommonUseApp(HttpServletRequest request) {
        String uid = (String) request.getAttribute("id");
        return appInfoService.getCommonUseApp(uid);
    }

    @PutMapping("/useAppType")
    @ApiOperation("更新使用app的类型")
    public CommonResult changeUseAppType(Integer type, String aid, HttpServletRequest request) {
        String uid = (String) request.getAttribute("id");
        if (appInfoService.changeUseAppType(uid, aid, type) > 0) {
            return new CommonResult().success();
        } else {
            return new CommonResult().fail();
        }
    }

    @PostMapping("/useApp")
    @ApiOperation("添加用户的使用app")
    public void addUseApp(String id, String type, HttpServletResponse response, HttpServletRequest request) {
        AppInfo appinfo = appInfoService.getAppInfoById(id);
        //如果appid、appkey、appurl都存在，那么进行用户添加请求
        if (appinfo != null && StringUtils.isNotEmpty(appinfo.getConnectid()) && StringUtils.isNotEmpty(appinfo.getConnectkey()) && StringUtils.isNotEmpty(appinfo.getAppurl())) {
            String responseUrl = "";
            if (MessageCommunicateType.INDEX.getCommunicateName().equals(type)) {
                responseUrl = appinfo.getIndexurl();
            } else if (MessageCommunicateType.SEND.getCommunicateName().equals(type)) {
                responseUrl = appinfo.getSendmessurl();
            } else if (MessageCommunicateType.RECEIVE.getCommunicateName().equals(type)) {
                responseUrl = appinfo.getReceivemessurl();
            }
            long timestamp = Calendar.getInstance().getTimeInMillis();
            PlatformParam platformParam = new PlatformParam();
            platformParam.setTimestamp(timestamp);
            platformParam.setAppid(appinfo.getId());
            platformParam.setSchoolid((String) request.getAttribute("schoolId"));
            platformParam.setUid((String) request.getAttribute("id"));
            platformParam.setToken(UUID.randomUUID().toString());
            String ticket = AESUtil.AESEncode(appinfo.getConnectkey(), JSONObject.toJSONString(platformParam));
            Map<String, String> paramMap = new HashMap<>();
            paramMap.put("responseurl", responseUrl);
            paramMap.put("ticket", ticket);
            try {
                response.sendRedirect(HttpClientUtil.getURL(appinfo.getAppurl(), paramMap));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @GetMapping("/getCurUserInfoBetweenPlatform")
    @ApiOperation("获取当前登录用户的信息")
    public BaseUserInfo getCurUserInfoBetweenPlatform(String ticket, String appid) {
        AppInfo appInfo = appInfoService.getAppInfoById(appid);
        if (appInfo != null && StringUtils.isNotEmpty(appInfo.getConnectkey())) {
            //获取加密前的json
            String content = AESUtil.AESDncode(appInfo.getConnectkey(), ticket);
            if (StringUtils.isNotEmpty(content)) {
                PlatformParam platformParam = JSONObject.parseObject(content, PlatformParam.class);
                if (platformParam != null && StringUtils.isNotEmpty(platformParam.getUid())) {
                    User user = userService.getUserById(platformParam.getUid(), platformParam.getSchoolid());
                    BaseUserInfo baseUserInfo = new BaseUserInfo();
                    if (user != null) {
                        BeanUtils.copyProperties(user, baseUserInfo);
                        baseUserInfo.setUseid(user.getId());
                        SchoolInfo schoolInfo = schoolInfoService.getSchoolInfoById(user.getSchoolid());
                        baseUserInfo.setSchoolname(schoolInfo == null ? null : schoolInfo.getSchoolname());
                        RoleInfo roleInfo = roleInfoService.getRoleById(user.getRoleid(), user.getSchoolid());
                        baseUserInfo.setRolename(roleInfo == null ? null : roleInfo.getRolename());
                    }
                    return baseUserInfo;
                }
            }
        }
        return null;
    }

    @GetMapping("/getUserInfoByIdBetweenPlatform")
    @ApiOperation("根据用户id获取用户")
    public BaseUserInfo getUserInfoByIdBetweenPlatform(String ticket, String appid, String userid, String schoolid) {
        AppInfo appInfo = appInfoService.getAppInfoById(appid);
        if (appInfo != null && StringUtils.isNotEmpty(appInfo.getConnectkey())) {
            //获取加密前的json
            String content = AESUtil.AESDncode(appInfo.getConnectkey(), ticket);
            if (StringUtils.isNotEmpty(content)) {
                PlatformParam platformParam = JSONObject.parseObject(content, PlatformParam.class);
                if (platformParam != null && StringUtils.isNotEmpty(platformParam.getUid())) {
                    User user = userService.getUserById(userid, schoolid);
                    BaseUserInfo baseUserInfo = new BaseUserInfo();
                    if (user != null) {
                        BeanUtils.copyProperties(user, baseUserInfo);
                        baseUserInfo.setUseid(user.getId());
                        SchoolInfo schoolInfo = schoolInfoService.getSchoolInfoById(user.getSchoolid());
                        baseUserInfo.setSchoolname(schoolInfo == null ? null : schoolInfo.getSchoolname());
                        RoleInfo roleInfo = roleInfoService.getRoleById(user.getRoleid(), schoolid);
                        baseUserInfo.setRolename(roleInfo == null ? null : roleInfo.getRolename());
                    }
                    return baseUserInfo;
                }
            }
        }
        return null;
    }
    /*@PostMapping("/authorize")
    @ApiOperation("授权接口")
    public void authorize(@RequestBody PlatformResult platformResult, HttpServletRequest request) {

    }*/
}
