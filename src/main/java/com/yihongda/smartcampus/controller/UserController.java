package com.yihongda.smartcampus.controller;

import com.github.pagehelper.PageHelper;
import com.yihongda.smartcampus.entity.*;
import com.yihongda.smartcampus.enums.ReturnCodeType;
import com.yihongda.smartcampus.message.CommonResult;
import com.yihongda.smartcampus.message.ExceptionResult;
import com.yihongda.smartcampus.service.UserService;
import com.yihongda.smartcampus.util.CusAccessObjectUtil;
import com.yihongda.smartcampus.util.ExcelUtil;
import com.yihongda.smartcampus.util.MD5Util;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.*;
import java.net.URLEncoder;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/user")
@Api("用户")
public class UserController {
    @Autowired
    private UserService userService;
    @Value("${file.store.commonPath}")
    private String commonPath;
    public static String EXCEL_FILE_NAME = "用户表.xls";

    @PostMapping("")
    @ApiOperation("添加用户")
    public CommonResult addUser(@Valid User user, HttpServletRequest request) {
        if (userService.getCountByUserName(user.getUsername()) > 0) {
            return new CommonResult(ReturnCodeType.NAME_REPEAT.getStringCode(), ReturnCodeType.NAME_REPEAT.getMsg());
        }
        user.setPassword(MD5Util.md5("123456"));
        user.setCreateuser((String) request.getAttribute("id"));
        user.setCreatetime(new Date());
        user.setCreateip(CusAccessObjectUtil.getIpAddress(request));
        user.setStatus(1);
        user.setSchoolid((String) request.getAttribute("schoolId"));
        if (userService.saveUser(user) <= 0) {
            return new CommonResult().fail();
        }
        return new CommonResult().success();
    }

    @PostMapping("/updateUser")
    @ApiOperation("编辑用户")
    public CommonResult updateUser(@Valid User user, HttpServletRequest request) {
        if (userService.getCountByIdAndUserName(user.getId(), user.getUsername()) > 0) {
            return new CommonResult(ReturnCodeType.NAME_REPEAT.getStringCode(), ReturnCodeType.NAME_REPEAT.getMsg());
        }
        user.setSchoolid((String) request.getAttribute("schoolId"));
        if (userService.updateUser(user) <= 0) {
            return new CommonResult().fail();
        }
        return new CommonResult().success();
    }

    @PostMapping("deleteUser/{id}")
    @ApiOperation("删除用户")
    public CommonResult deleteUser(@PathVariable String id) {
        if (userService.deleteUser(id) > 0) {
            return new CommonResult().success();
        } else {
            return new CommonResult().fail();
        }
    }

    @GetMapping("getUser/{id}")
    @ApiOperation("根据id获取用户")
    public User getUser(@PathVariable String id, HttpServletRequest request) {
        return userService.getUserById(id, (String) request.getAttribute("schoolId"));
    }

    @GetMapping("/userListByParam")
    @ApiOperation("根据参数查询全部用户")
    public List<User> getUserListByParam(UserParam userParam, HttpServletRequest request) {
        if (userParam != null && userParam.getPagenum() != null && userParam.getPagesize() != null) {
            PageHelper.startPage(userParam.getPagenum(), userParam.getPagesize());
        }
        userParam.setSchoolid((String) request.getAttribute("schoolId"));
        return userService.getUserListByParam(userParam);
    }

    @GetMapping("/unauditedUserListByParam")
    @ApiOperation("根据参数获取未审核的全部用户")
    public List<User> getUnauditedUserListByParam(UserParam userParam, HttpServletRequest request) {
        if (userParam != null && userParam.getPagenum() != null && userParam.getPagesize() != null) {
            PageHelper.startPage(userParam.getPagenum(), userParam.getPagesize());
        }
        userParam.setSchoolid((String) request.getAttribute("schoolId"));
        return userService.getUnauditedUserListByParam(userParam);
    }

    @GetMapping("/pageCount")
    @ApiOperation("获取页面页数")
    public Integer getPageCount(UserParam userParam, HttpServletRequest request) {
        userParam.setSchoolid((String) request.getAttribute("schoolId"));
        int userCount = userService.getUserCount(userParam);
        if (userParam.getPagesize() == null) {
            userParam.setPagesize(10);
        }
        int pageNum = 0;
        if (userCount > 0) {
            if (userCount % userParam.getPagesize() == 0) {
                pageNum = userCount / userParam.getPagesize();
            } else {
                pageNum = userCount / userParam.getPagesize() + 1;
            }
        }
        return pageNum;
    }

    @PostMapping("/excel")
    @ApiOperation("导入excel")
    public CommonResult importExcel(MultipartFile upfile_file, HttpServletRequest request) {
        if (upfile_file == null) {
            return new CommonResult().fail();
        }
        if (upfile_file.getOriginalFilename().endsWith(".xls") || upfile_file.getOriginalFilename().endsWith(".xlsx")) {
            List<User> userList = null;
            try {
                userList = ExcelUtil.importExcel(upfile_file, 0, 1, User.class);
            } catch (Exception e) {
                e.printStackTrace();
                return new ExceptionResult();
            }
            List<String> userNameList = userService.getUserNameList();
            String errMsg = "";
            if (userList != null) {
                for (User user : userList) {
                    if (userNameList.contains(user.getUsername())) {
                        errMsg += "用户名为[" + user.getUsername() + "]的用户已存在<br/>";
                    } else {
                        user.setPassword(MD5Util.md5("123456"));
                        user.setStatus(1);
                        user.setSchoolid((String) request.getAttribute("schoolId"));
                        userNameList.add(user.getUsername());
                    }
                }
            }
            if (StringUtils.isNotEmpty(errMsg)) {
                return new CommonResult(ReturnCodeType.NAME_REPEAT.getStringCode(), errMsg);
            }
            if (userService.saveUserList(userList) > 0) {
                return new CommonResult().success();
            } else {
                return new CommonResult().fail();
            }
        }
        return new CommonResult().fail();
    }

    @GetMapping("/excelTemplate")
    @ApiOperation("导出excel模板")
    public void getExcelTemplate(HttpServletRequest request, HttpServletResponse response) {
        String filePath = commonPath;
        String fileName = EXCEL_FILE_NAME;
        FileInputStream fis = null;
        try {
            fis = new FileInputStream(filePath + fileName);
            response.setContentType("applicaiton/x-download");
            if (request.getHeader("User-Agent").toLowerCase().indexOf("firefox") > 0) {
                fileName = new String(fileName.getBytes("UTF-8"), "ISO8859-1"); // firefox浏览器
            } else if (request.getHeader("User-Agent").toUpperCase().indexOf("MSIE") > 0) {
                fileName = URLEncoder.encode(fileName, "UTF-8");// IE浏览器
            } else if (request.getHeader("User-Agent").toUpperCase().indexOf("CHROME") > 0) {
                fileName = new String(fileName.getBytes("UTF-8"), "ISO8859-1");// 谷歌
            }
            response.addHeader("Content-Disposition", "attachment;filename=" + fileName);
            //将文件写入输出流, 显示在界面上, 实现预览效果
            OutputStream os = response.getOutputStream();
            int count = 0;
            byte[] buffer = new byte[1024 * 1024];
            while ((count = fis.read(buffer)) != -1) {
                os.write(buffer, 0, count);
            }
            os.flush();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/updatePermission")
    @ApiOperation("更新用户权限")
    public CommonResult updatePermission(@Valid UserPermissionDTO userPermissionDTO) {
        if (userService.savePermission(userPermissionDTO) > 0) {
            return new CommonResult().success();
        } else {
            return new CommonResult().fail();
        }
    }

    @GetMapping("/permission/{uid}")
    @ApiOperation("获取用户权限")
    public List<Permission> getPermissionTree(@PathVariable String uid, HttpServletRequest request) {
        return userService.getPermissionTree(uid, (String) request.getAttribute("schoolId"));
    }

    @PostMapping("/authorize/{uid}")
    @ApiOperation("用户授权")
    public CommonResult authorize(@PathVariable String uid) {
        if (userService.authorize(uid) > 0) {
            return new CommonResult().success();
        } else {
            return new CommonResult().fail();
        }
    }

    @PostMapping("/status")
    @ApiOperation("更新用户状态")
    public CommonResult changeRoleStatus(UserInfo userInfo) {
        if (userService.changeRoleStatus(userInfo) > 0) {
            return new CommonResult().success();
        } else {
            return new CommonResult().fail();
        }
    }
}
