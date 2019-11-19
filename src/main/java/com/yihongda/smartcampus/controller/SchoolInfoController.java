package com.yihongda.smartcampus.controller;

import com.yihongda.smartcampus.entity.SchoolInfo;
import com.yihongda.smartcampus.entity.SchoolTypeVO;
import com.yihongda.smartcampus.enums.ReturnCodeType;
import com.yihongda.smartcampus.enums.SchoolType;
import com.yihongda.smartcampus.message.CommonResult;
import com.yihongda.smartcampus.message.ExceptionResult;
import com.yihongda.smartcampus.service.SchoolInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/schoolInfo")
@Api("学校信息")
public class SchoolInfoController {
    @Autowired
    private SchoolInfoService schoolInfoService;

    @Value("${file.store.commonPath}")
    private String commonPath;

    @Value("${file.store.savePath}")
    private String savePath;

    @PostMapping("")
    @ApiOperation("添加学校信息")
    public CommonResult saveSchoolInfo(SchoolInfo schoolInfo, MultipartFile upfile_logo, MultipartFile upfile_bgimg, HttpServletRequest request) {
        if (schoolInfoService.getCountBySchoolNameAndId(schoolInfo.getId(), schoolInfo.getSchoolname()) > 0) {
            return new CommonResult(ReturnCodeType.NAME_REPEAT.getStringCode(), ReturnCodeType.NAME_REPEAT.getMsg());
        }
        if (upfile_logo != null) {
            String filePath = commonPath;
            File path = new File(filePath);
            if (!path.exists()) {
                path.mkdirs();
            }
            String fileName = UUID.randomUUID().toString() + upfile_logo.getOriginalFilename().substring(upfile_logo.getOriginalFilename().lastIndexOf("."));
            if (!filePath.endsWith(File.separator)) {
                filePath += File.separator;
            }
            File newFile = new File(filePath + fileName);
            try {
                upfile_logo.transferTo(newFile);
            } catch (IOException e) {
                e.printStackTrace();
                return new ExceptionResult(e);
            }
            schoolInfo.setLogo(savePath + fileName);
        }
        if (upfile_bgimg != null) {
            String filePath = commonPath;
            File path = new File(filePath);
            if (!path.exists()) {
                path.mkdirs();
            }
            String fileName = UUID.randomUUID().toString() + upfile_bgimg.getOriginalFilename().substring(upfile_bgimg.getOriginalFilename().lastIndexOf("."));
            if (!filePath.endsWith(File.separator)) {
                filePath += File.separator;
            }
            File newFile = new File(filePath + fileName);
            try {
                upfile_bgimg.transferTo(newFile);
            } catch (IOException e) {
                e.printStackTrace();
                return new ExceptionResult(e);
            }
            schoolInfo.setBgimg(savePath + fileName);
        }
        if (schoolInfoService.saveSchoolInfo(schoolInfo) <= 0) {
            return new CommonResult().fail();
        }
        return new CommonResult().success();
    }

    @PostMapping("/updateSchoolInfo")
    @ApiOperation("修改学校信息")
    public CommonResult updateSchoolInfo(SchoolInfo schoolInfo, MultipartFile upfile_logo, MultipartFile upfile_bgimg, HttpServletRequest request) {
        if (schoolInfoService.getCountBySchoolNameAndId(schoolInfo.getId(), schoolInfo.getSchoolname()) > 0) {
            return new CommonResult(ReturnCodeType.NAME_REPEAT.getStringCode(), ReturnCodeType.NAME_REPEAT.getMsg());
        }
        if (upfile_logo != null) {
            String filePath = commonPath;
            File path = new File(filePath);
            if (!path.exists()) {
                path.mkdirs();
            }
            String fileName = "";
            if (StringUtils.isNotEmpty(upfile_logo.getOriginalFilename())) {
                fileName = UUID.randomUUID().toString() + upfile_logo.getOriginalFilename().substring(upfile_logo.getOriginalFilename().lastIndexOf("."));
                if (!filePath.endsWith(File.separator)) {
                    filePath += File.separator;
                }
                File newFile = new File(filePath + fileName);
                try {
                    upfile_logo.transferTo(newFile);
                } catch (IOException e) {
                    e.printStackTrace();
                    return new ExceptionResult(e);
                }
                schoolInfo.setLogo(savePath + fileName);
            }
        }
        if (upfile_bgimg != null) {
            String filePath = commonPath;
            File path = new File(filePath);
            if (!path.exists()) {
                path.mkdirs();
            }
            String fileName = "";
            if (StringUtils.isNotEmpty(upfile_bgimg.getOriginalFilename())) {
                fileName = UUID.randomUUID().toString() + upfile_bgimg.getOriginalFilename().substring(upfile_bgimg.getOriginalFilename().lastIndexOf("."));
                if (!filePath.endsWith(File.separator)) {
                    filePath += File.separator;
                }
                File newFile = new File(filePath + fileName);
                try {
                    upfile_bgimg.transferTo(newFile);
                } catch (IOException e) {
                    e.printStackTrace();
                    return new ExceptionResult(e);
                }
                schoolInfo.setBgimg(savePath + fileName);
            }
        }
        if (schoolInfoService.updateSchoolInfo(schoolInfo) <= 0) {
            return new CommonResult().fail();
        }
        return new CommonResult().success();
    }

    @GetMapping("/schoolInfoList")
    @ApiOperation("获取学校信息列表")
    public List<SchoolInfo> getSchoolInfoList() {
        return schoolInfoService.getSchoolList();
    }

    @GetMapping("schoolTypeList")
    @ApiOperation("获取学校类型")
    public List<SchoolTypeVO> getschoolTypeList() {
        List<SchoolTypeVO> schoolTypeVOList = new ArrayList<>();
        SchoolType[] schoolTypes = SchoolType.values();
        if (schoolTypes != null) {
            for (SchoolType schoolType : schoolTypes) {
                SchoolTypeVO schoolTypeVo = new SchoolTypeVO();
                schoolTypeVo.setSchooltype(schoolType.getSchooltype());
                schoolTypeVo.setSchoolname(schoolType.getSchoolName());
                schoolTypeVOList.add(schoolTypeVo);
            }
        }
        return schoolTypeVOList;
    }

    @GetMapping("")
    @ApiOperation("获取当前用户对应的学校信息")
    public SchoolInfo getSchoolInfoById(HttpServletRequest request) {
        String schoolid = (String) request.getAttribute("schoolId");
        if (StringUtils.isNotEmpty(schoolid)) {
            return schoolInfoService.getSchoolInfoById(schoolid);
        } else {
            return null;
        }
    }

}
