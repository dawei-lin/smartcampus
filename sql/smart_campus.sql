/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50545
Source Host           : localhost:3306
Source Database       : smart_campus

Target Server Type    : MYSQL
Target Server Version : 50545
File Encoding         : 65001

Date: 2019-11-19 17:15:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for appinfo
-- ----------------------------
DROP TABLE IF EXISTS `appinfo`;
CREATE TABLE `appinfo` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `appname` varchar(50) DEFAULT NULL COMMENT '应用名称',
  `appurl` varchar(100) DEFAULT NULL COMMENT '访问地址',
  `applogo` varchar(100) DEFAULT NULL COMMENT '应用logo',
  `apptype` varchar(36) DEFAULT NULL COMMENT '应用类型',
  `company` varchar(50) DEFAULT NULL COMMENT '厂商名',
  `contact` varchar(20) DEFAULT NULL COMMENT '厂商联系人',
  `tel` varchar(20) DEFAULT NULL COMMENT '厂商联系电话',
  `connectkey` varchar(50) DEFAULT NULL COMMENT '厂商提供的key',
  `connectid` varchar(50) DEFAULT NULL COMMENT '厂商提供的id',
  `bmess` bit(1) DEFAULT NULL COMMENT '是否含有消息中心 0无 1有',
  `status` int(11) DEFAULT '1' COMMENT '应用状态,0禁用，1启用',
  `accesstime` datetime DEFAULT NULL COMMENT '接入时间',
  `sendmessurl` varchar(255) DEFAULT NULL,
  `receivemessurl` varchar(255) DEFAULT NULL,
  `indexurl` varchar(255) DEFAULT NULL,
  `accesstype` int(11) DEFAULT '1' COMMENT '接入方式，1代表主动，2代表被动',
  PRIMARY KEY (`id`),
  KEY `appinfo_ibfk_1` (`apptype`),
  CONSTRAINT `appinfo_ibfk_1` FOREIGN KEY (`apptype`) REFERENCES `apptype` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of appinfo
-- ----------------------------
INSERT INTO `appinfo` VALUES ('01', '米信OA', 'http://www.mixin.cc/', 'http://www.mixin.cc/website/images/logo_2.png', '03', '米信', '小一', '13800138000', '54F21AFD30D5C8C7', '	BF4089CDC187B28E', '\0', '1', null, null, null, null, '1');
INSERT INTO `appinfo` VALUES ('02', '学乐云平台2', 'https://cas.xueleyun.com', '/smartcampus/upload/45993da0-db7e-4900-b1d7-794af3aa75a5.png', '02', '学乐云', null, '13800138015', '9A2639589908E61E', '0C8DD0869C917979', null, '1', null, null, null, null, '1');
INSERT INTO `appinfo` VALUES ('03', '兔尾巴资产管理', 'https://www.zyicloud.com/', 'https://www.zyicloud.com/qdweb_2018/static/img/menu/icon_logo_2x_white.png', '02', '兔尾巴', '小三', '13800138364', '817B101AF7AFD637', '	EB3962C7D834AB9D', '', '1', null, null, null, null, '1');
INSERT INTO `appinfo` VALUES ('04', '米信OA1', 'http://www.mixin.cc/', 'http://www.mixin.cc/website/images/logo_2.png', '03', '米信', '小一', '13800138000', '54F21AFD30D5C8C7', '	BF4089CDC187B28E', '\0', '1', '2019-11-06 09:40:47', null, null, null, '1');
INSERT INTO `appinfo` VALUES ('05', '学乐云平台1', 'https://cas.xueleyun.com', 'https://asset.xueleyun.com/login/imgs/v3/logo.png', '01', '学乐云', '小二', '138001380158', '9A2639589908E61E', '0C8DD0869C917979', '', '1', '2019-11-06 09:41:06', null, null, null, '1');
INSERT INTO `appinfo` VALUES ('06', '兔尾巴资产管理1', 'https://www.zyicloud.com/', 'https://www.zyicloud.com/qdweb_2018/static/img/menu/icon_logo_2x_white.png', '02', '兔尾巴', '小三', '13800138364', '817B101AF7AFD637', '	EB3962C7D834AB9D', '', '1', '2019-11-06 09:41:40', null, null, null, '1');
INSERT INTO `appinfo` VALUES ('7107ab07-0450-11ea-97d3-14dda9ec820d', '应用1', 'asdasd', '/smartcampus/upload/bb12a107-5bb5-42ab-b917-3a1c22208623.png', '01', '111', null, '12345678901', 'asdasd', 'asdasd', '', '1', '2019-11-11 14:57:02', null, null, null, '1');
INSERT INTO `appinfo` VALUES ('f3c989d8-0073-11ea-bb48-f0795939be61', '米信OA22', 'http://www.mixin.cc/', 'http://www.mixin.cc/website/images/logo_2.png', '03', '米信', null, '13800138000', '54F21AFD30D5C8C7', '	BF4089CDC187B28E', null, '1', null, null, null, null, '1');
INSERT INTO `appinfo` VALUES ('f3c98ed6-0073-11ea-bb48-f0795939be61', '学乐云平台', 'https://cas.xueleyun.com', 'https://asset.xueleyun.com/login/imgs/v3/logo.png', '01', '学乐云', '小二', '138001380158', '9A2639589908E61E', '0C8DD0869C917979', '', '1', null, null, null, null, '1');
INSERT INTO `appinfo` VALUES ('f3c990f6-0073-11ea-bb48-f0795939be61', '兔尾巴资产管理', 'https://www.zyicloud.com/', 'https://www.zyicloud.com/qdweb_2018/static/img/menu/icon_logo_2x_white.png', '02', '兔尾巴', '小三', '13800138364', '817B101AF7AFD637', '	EB3962C7D834AB9D', '', '1', null, null, null, null, '1');
INSERT INTO `appinfo` VALUES ('f3c992ad-0073-11ea-bb48-f0795939be61', '米信OA12', 'http://www.mixin.cc/', 'http://www.mixin.cc/website/images/logo_2.png', '03', '米信', null, '13800138000', '54F21AFD30D5C8C7', '	BF4089CDC187B28E', null, '1', '2019-11-06 09:40:47', null, null, null, '1');
INSERT INTO `appinfo` VALUES ('f3c99473-0073-11ea-bb48-f0795939be61', '学乐云平台1', 'https://cas.xueleyun.com', 'https://asset.xueleyun.com/login/imgs/v3/logo.png', '01', '学乐云', '小二', '138001380158', '9A2639589908E61E', '0C8DD0869C917979', '', '1', '2019-11-06 09:41:06', null, null, null, '1');
INSERT INTO `appinfo` VALUES ('f3c99617-0073-11ea-bb48-f0795939be61', '兔尾巴资产管理1', 'https://www.zyicloud.com/', 'https://www.zyicloud.com/qdweb_2018/static/img/menu/icon_logo_2x_white.png', '02', '兔尾巴', '小三', '13800138364', '817B101AF7AFD637', '	EB3962C7D834AB9D', '', '1', '2019-11-06 09:41:40', null, null, null, '1');

-- ----------------------------
-- Table structure for apptype
-- ----------------------------
DROP TABLE IF EXISTS `apptype`;
CREATE TABLE `apptype` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `tname` varchar(50) DEFAULT NULL COMMENT '类型名',
  `tdesc` varchar(100) DEFAULT NULL COMMENT '类型描述',
  `schoolid` varchar(36) DEFAULT NULL COMMENT '所属学校ID，对应schoolinfo的id，可空[空为全局类型]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of apptype
-- ----------------------------
INSERT INTO `apptype` VALUES ('01', '教务管理', null, '33df8e5e-f3cd-11e9-90d5-14dda9ec820d');
INSERT INTO `apptype` VALUES ('02', '财务管理', '描述11', null);
INSERT INTO `apptype` VALUES ('03', '办公管理', null, null);

-- ----------------------------
-- Table structure for menuinfo
-- ----------------------------
DROP TABLE IF EXISTS `menuinfo`;
CREATE TABLE `menuinfo` (
  `id` varchar(36) NOT NULL COMMENT '用户ID',
  `menuname` varchar(50) DEFAULT NULL COMMENT '菜单名称',
  `url` varchar(100) DEFAULT NULL COMMENT '访问地址',
  `pid` varchar(36) DEFAULT NULL COMMENT '父菜单',
  `status` int(11) DEFAULT NULL COMMENT '状态 0禁用 1启用',
  `schoolid` varchar(36) DEFAULT NULL COMMENT '所属学校ID，对应schoolinfo的id，可空[空为全局模块权限]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of menuinfo
-- ----------------------------
INSERT INTO `menuinfo` VALUES ('01', '统一数据中心', null, null, '1', null);
INSERT INTO `menuinfo` VALUES ('02', '统一接入中心', null, null, '1', null);
INSERT INTO `menuinfo` VALUES ('03', '统一消息中心', null, null, '1', null);
INSERT INTO `menuinfo` VALUES ('05', '管理中心', null, null, '1', null);
INSERT INTO `menuinfo` VALUES ('06', '我的应用', 'wodeyingyong.html', '02', '1', null);
INSERT INTO `menuinfo` VALUES ('07', '全部应用', 'quanbuyingyong.html', '02', '1', null);
INSERT INTO `menuinfo` VALUES ('08', '消息发送', 'fasongxiaoxi.html', '03', '1', null);
INSERT INTO `menuinfo` VALUES ('09', '消息查看', 'jieshouxiaoxi.html', '03', '1', null);
INSERT INTO `menuinfo` VALUES ('10', '学校信息', 'xuexiaoxinxi.html', '05', '1', null);
INSERT INTO `menuinfo` VALUES ('11', '用户信息', 'userinfoBrowse.html', '05', '1', null);
INSERT INTO `menuinfo` VALUES ('12', '用户审核', 'yonghushenhe.html', '05', '1', null);
INSERT INTO `menuinfo` VALUES ('13', '角色信息', 'jiaosexinxi.html', '05', '1', null);
INSERT INTO `menuinfo` VALUES ('14', '应用信息', 'yingyongxinxi.html', '05', '1', null);
INSERT INTO `menuinfo` VALUES ('15', '应用分类', 'yingyongfenlei.html', '05', '1', null);

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` varchar(36) NOT NULL COMMENT '用户ID',
  `menuid` varchar(36) DEFAULT NULL COMMENT '菜单id，对应menuinfo的id',
  `pdes` varchar(100) DEFAULT NULL COMMENT '权限描述',
  `appid` varchar(36) DEFAULT NULL COMMENT '应用id，对应appinfo的id，可空',
  `schoolid` varchar(36) DEFAULT NULL COMMENT '所属学校ID，对应schoolinfo的id，可空[空为全局模块权限]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES ('fb12f468-f47d-11e9-a922-f0795939be61', '01', null, null, null);
INSERT INTO `permission` VALUES ('fb12f7d5-f47d-11e9-a922-f0795939be61', '02', null, null, null);
INSERT INTO `permission` VALUES ('fb12f908-f47d-11e9-a922-f0795939be61', '03', null, null, null);
INSERT INTO `permission` VALUES ('fb12f9e5-f47d-11e9-a922-f0795939be61', '05', null, null, null);
INSERT INTO `permission` VALUES ('fb12faac-f47d-11e9-a922-f0795939be61', '06', null, null, null);
INSERT INTO `permission` VALUES ('fb12fb6d-f47d-11e9-a922-f0795939be61', '07', null, null, null);
INSERT INTO `permission` VALUES ('fb12fc25-f47d-11e9-a922-f0795939be61', '08', null, null, null);
INSERT INTO `permission` VALUES ('fb12fcdc-f47d-11e9-a922-f0795939be61', '09', null, null, null);
INSERT INTO `permission` VALUES ('fb12fda0-f47d-11e9-a922-f0795939be61', '10', null, null, null);
INSERT INTO `permission` VALUES ('fb12fe51-f47d-11e9-a922-f0795939be61', '11', null, null, null);
INSERT INTO `permission` VALUES ('fb12ff03-f47d-11e9-a922-f0795939be61', '12', null, null, null);
INSERT INTO `permission` VALUES ('fb12ffb7-f47d-11e9-a922-f0795939be61', '13', null, null, null);
INSERT INTO `permission` VALUES ('fb130072-f47d-11e9-a922-f0795939be61', '14', null, null, null);
INSERT INTO `permission` VALUES ('fb13016d-f47d-11e9-a922-f0795939be61', '15', null, null, null);

-- ----------------------------
-- Table structure for roleinfo
-- ----------------------------
DROP TABLE IF EXISTS `roleinfo`;
CREATE TABLE `roleinfo` (
  `id` varchar(36) NOT NULL COMMENT '用户ID',
  `rolename` varchar(255) DEFAULT NULL COMMENT '角色名',
  `roledes` varchar(100) DEFAULT NULL COMMENT '角色描述',
  `schoolid` varchar(36) DEFAULT NULL COMMENT '所属学校ID，对应schoolinfo的id，可空[空为全局角色]',
  `status` int(11) DEFAULT '1' COMMENT '角色状态，0代表禁用，1代表启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of roleinfo
-- ----------------------------
INSERT INTO `roleinfo` VALUES ('5c4bbe71-028c-11ea-8801-14dda9ec820d', '学生', '学生角色', '33df8e5e-f3cd-11e9-90d5-14dda9ec820d', '1');
INSERT INTO `roleinfo` VALUES ('b17a2cf8-ffa4-11e9-94e5-14dda9ec820d', '老师', '老师角色', null, '1');

-- ----------------------------
-- Table structure for rolepermission
-- ----------------------------
DROP TABLE IF EXISTS `rolepermission`;
CREATE TABLE `rolepermission` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `rid` varchar(36) DEFAULT NULL COMMENT '角色id',
  `pid` varchar(36) DEFAULT NULL COMMENT '权限id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_rid_pid` (`rid`,`pid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of rolepermission
-- ----------------------------
INSERT INTO `rolepermission` VALUES ('c02c8469-0a72-11ea-8880-14dda9ec820d', '5c4bbe71-028c-11ea-8801-14dda9ec820d', 'fb12f7d5-f47d-11e9-a922-f0795939be61');
INSERT INTO `rolepermission` VALUES ('c02c8a44-0a72-11ea-8880-14dda9ec820d', '5c4bbe71-028c-11ea-8801-14dda9ec820d', 'fb12f908-f47d-11e9-a922-f0795939be61');
INSERT INTO `rolepermission` VALUES ('c02c9081-0a72-11ea-8880-14dda9ec820d', '5c4bbe71-028c-11ea-8801-14dda9ec820d', 'fb12f9e5-f47d-11e9-a922-f0795939be61');
INSERT INTO `rolepermission` VALUES ('c02c8821-0a72-11ea-8880-14dda9ec820d', '5c4bbe71-028c-11ea-8801-14dda9ec820d', 'fb12fb6d-f47d-11e9-a922-f0795939be61');
INSERT INTO `rolepermission` VALUES ('c02c8c1b-0a72-11ea-8880-14dda9ec820d', '5c4bbe71-028c-11ea-8801-14dda9ec820d', 'fb12fc25-f47d-11e9-a922-f0795939be61');
INSERT INTO `rolepermission` VALUES ('c02c8eb0-0a72-11ea-8880-14dda9ec820d', '5c4bbe71-028c-11ea-8801-14dda9ec820d', 'fb12fcdc-f47d-11e9-a922-f0795939be61');
INSERT INTO `rolepermission` VALUES ('c02c9241-0a72-11ea-8880-14dda9ec820d', '5c4bbe71-028c-11ea-8801-14dda9ec820d', 'fb12fda0-f47d-11e9-a922-f0795939be61');
INSERT INTO `rolepermission` VALUES ('c02c941a-0a72-11ea-8880-14dda9ec820d', '5c4bbe71-028c-11ea-8801-14dda9ec820d', 'fb12fe51-f47d-11e9-a922-f0795939be61');

-- ----------------------------
-- Table structure for schoolinfo
-- ----------------------------
DROP TABLE IF EXISTS `schoolinfo`;
CREATE TABLE `schoolinfo` (
  `id` varchar(36) NOT NULL COMMENT '用户ID',
  `schoolname` varchar(50) DEFAULT NULL COMMENT '学校名称',
  `contact` varchar(20) DEFAULT NULL COMMENT '联系人',
  `tel` varchar(11) DEFAULT NULL COMMENT '联系人手机号',
  `logo` varchar(100) DEFAULT NULL COMMENT '学校logo',
  `bgimg` varchar(100) DEFAULT NULL COMMENT '背景图',
  `address` varchar(100) DEFAULT NULL COMMENT '地址',
  `schooltype` varchar(20) DEFAULT NULL COMMENT '学校类型 [幼儿园、小学、初中、高中]可多选',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of schoolinfo
-- ----------------------------
INSERT INTO `schoolinfo` VALUES ('33df8e5e-f3cd-11e9-90d5-14dda9ec820d', '深圳市高级中学', '联系人122', '12345678901', '/smartcampus/upload/c8232e14-5be2-4b43-b341-08bbda31502b.png', '/smartcampus/upload/b4962ec1-d310-4dae-8782-06501a642b0c.png', '深圳市', '2');
INSERT INTO `schoolinfo` VALUES ('33df8e5e-f3cd-11e9-90d5-18dda9ec330d', '深圳市初级中学', '联系人2', '13800138000', '', '', '深圳市龙华区', '2');

-- ----------------------------
-- Table structure for useapp
-- ----------------------------
DROP TABLE IF EXISTS `useapp`;
CREATE TABLE `useapp` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `uid` varchar(36) DEFAULT NULL COMMENT '用户id，对应userinfo的id',
  `aid` varchar(36) DEFAULT NULL COMMENT 'appid，对应appinfo的id',
  `type` int(11) DEFAULT NULL COMMENT '1常用 0普通',
  `sn` int(11) DEFAULT NULL COMMENT '排序号',
  `token` varchar(50) DEFAULT NULL COMMENT '应用授权码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of useapp
-- ----------------------------
INSERT INTO `useapp` VALUES ('3b1d41a0-f17c-11e9-840a-74dda9ec820d', '2d2c6aec-0065-11ea-9dff-14dda9ec820d', 'f3c989d8-0073-11ea-bb48-f0795939be61', '1', null, null);
INSERT INTO `useapp` VALUES ('95f9f3c1-f17b-11e9-840a-14dda9ec920d', '2d2c6aec-0065-11ea-9dff-14dda9ec820d', 'f3c98ed6-0073-11ea-bb48-f0795939be61', '0', null, null);

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` varchar(36) NOT NULL COMMENT '用户ID',
  `username` varchar(20) DEFAULT NULL COMMENT '用户名，仅英文数字下划线_',
  `password` varchar(50) DEFAULT NULL COMMENT '密码,MD5加密',
  `realname` varchar(20) DEFAULT NULL COMMENT '真实姓名',
  `code` varchar(20) DEFAULT NULL COMMENT '工号/学号',
  `tel` varchar(11) DEFAULT NULL COMMENT '手机号',
  `status` int(11) DEFAULT '-1' COMMENT '状态 0禁用 1启用 -1未审核',
  `schoolid` varchar(36) DEFAULT NULL COMMENT '所属学校ID，对应schoolinfo的id',
  `roleid` varchar(36) DEFAULT NULL COMMENT '角色ID,对应roleinfo的id',
  `createtime` datetime DEFAULT NULL COMMENT '创建日期',
  `createip` varchar(20) DEFAULT NULL COMMENT '创建IP',
  `createuser` varchar(36) DEFAULT NULL COMMENT '创建人ID，可为空',
  `auditor` varchar(36) DEFAULT NULL COMMENT '审核人ID',
  `audittime` datetime DEFAULT NULL COMMENT '审核日期',
  `lastlogintime` datetime DEFAULT NULL COMMENT '上次登录时间',
  `lastloginip` varchar(20) DEFAULT NULL COMMENT '上次登录ip',
  `recentlogintime` datetime DEFAULT NULL COMMENT '当前登录时间',
  `recentloginip` varchar(20) DEFAULT NULL COMMENT '当前登录ip',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('2012b383-006d-11ea-9dff-14dda9ec820d', 'admin11', 'e10adc3949ba59abbe56e057f20f883e', 'dada', 'dada', '12345678901', '1', '33df8e5e-f3cd-11e9-90d5-14dda9ec820d', 'b17a2cf8-ffa4-11e9-94e5-14dda9ec820d', '2019-11-06 16:12:08', '0:0:0:0:0:0:0:1', '2d2c6aec-0065-11ea-9dff-14dda9ec820d', null, null, null, null, null, null);
INSERT INTO `userinfo` VALUES ('24ee08fe-0066-11ea-9dff-14dda9ec820d', 'test', 'e10adc3949ba59abbe56e057f20f883e', 'dada', null, '12345678901', '1', '33df8e5e-f3cd-11e9-90d5-14dda9ec820d', null, '2019-11-06 15:22:10', '0:0:0:0:0:0:0:1', null, null, null, null, null, null, null);
INSERT INTO `userinfo` VALUES ('2d2c6aec-0065-11ea-9dff-14dda9ec820d', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'dada', 'dada', '12345678901', '0', '33df8e5e-f3cd-11e9-90d5-14dda9ec820d', '5c4bbe71-028c-11ea-8801-14dda9ec820d', '2019-11-06 15:15:14', '0:0:0:0:0:0:0:1', null, null, null, null, null, null, null);
INSERT INTO `userinfo` VALUES ('5107c0a1-01ce-11ea-ac13-14dda9ec820d', '用户11', 'e10adc3949ba59abbe56e057f20f883e', 'dada', 'dada', '12345678901', '1', null, 'd2ef168e-ff9f-11e9-94e5-14dda9ec820d', '2019-11-08 10:20:22', '0:0:0:0:0:0:0:1', '2d2c6aec-0065-11ea-9dff-14dda9ec820d', null, null, null, null, null, null);
INSERT INTO `userinfo` VALUES ('57afa55f-0773-11ea-a2bf-14dda9ec820d', 'admin22', 'e10adc3949ba59abbe56e057f20f883e', 'dada', 'dada', '12345678901', '1', '33df8e5e-f3cd-11e9-90d5-14dda9ec820d', '5c4bbe71-028c-11ea-8801-14dda9ec820d', '2019-11-15 14:44:16', '0:0:0:0:0:0:0:1', '2d2c6aec-0065-11ea-9dff-14dda9ec820d', null, null, null, null, null, null);
INSERT INTO `userinfo` VALUES ('673cfd1d-0435-11ea-97d3-14dda9ec820d', '用户113', 'e10adc3949ba59abbe56e057f20f883e', '姓名11', '2', '124', '1', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `userinfo` VALUES ('673cfd61-0435-11ea-97d3-14dda9ec820d', '用户3', 'e10adc3949ba59abbe56e057f20f883e', '姓名3', '3', '125', '0', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `userinfo` VALUES ('673cfda3-0435-11ea-97d3-14dda9ec820d', '用户4', 'e10adc3949ba59abbe56e057f20f883e', '姓名4', '4', '126', '0', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `userinfo` VALUES ('673cfdd9-0435-11ea-97d3-14dda9ec820d', '用户5', 'e10adc3949ba59abbe56e057f20f883e', '姓名5', '5', '127', '1', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `userinfo` VALUES ('673cfe0f-0435-11ea-97d3-14dda9ec820d', '用户6', 'e10adc3949ba59abbe56e057f20f883e', '姓名6', '6', '128', '1', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `userinfo` VALUES ('f1b2598d-09d1-11ea-b41a-14dda9ec820d', 'admin1122', 'e10adc3949ba59abbe56e057f20f883e', '111', '1111', '12345678901', '1', '33df8e5e-f3cd-11e9-90d5-14dda9ec820d', '5c4bbe71-028c-11ea-8801-14dda9ec820d', '2019-11-18 15:06:29', '0:0:0:0:0:0:0:1', '2d2c6aec-0065-11ea-9dff-14dda9ec820d', null, null, null, null, null, null);
INSERT INTO `userinfo` VALUES ('f60df40d-09d2-11ea-b41a-14dda9ec820d', 'admin8888', 'e10adc3949ba59abbe56e057f20f883e', 'dada', 'dada', '12345678901', '1', '33df8e5e-f3cd-11e9-90d5-14dda9ec820d', 'b17a2cf8-ffa4-11e9-94e5-14dda9ec820d', '2019-11-18 15:13:46', '0:0:0:0:0:0:0:1', null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for userpermission
-- ----------------------------
DROP TABLE IF EXISTS `userpermission`;
CREATE TABLE `userpermission` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `uid` varchar(36) DEFAULT NULL COMMENT '角色id',
  `pid` varchar(36) DEFAULT NULL COMMENT '权限id',
  `status` int(11) DEFAULT NULL COMMENT '状态 0禁用 1启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of userpermission
-- ----------------------------
INSERT INTO `userpermission` VALUES ('048d06fe-0771-11ea-a2bf-14dda9ec820d', '2012b383-006d-11ea-9dff-14dda9ec820d', 'fb12f468-f47d-11e9-a922-f0795939be61', null);
INSERT INTO `userpermission` VALUES ('048d0ee6-0771-11ea-a2bf-14dda9ec820d', '2012b383-006d-11ea-9dff-14dda9ec820d', 'fb12f7d5-f47d-11e9-a922-f0795939be61', null);
INSERT INTO `userpermission` VALUES ('048d112e-0771-11ea-a2bf-14dda9ec820d', '2012b383-006d-11ea-9dff-14dda9ec820d', 'fb12faac-f47d-11e9-a922-f0795939be61', null);
INSERT INTO `userpermission` VALUES ('048d12c0-0771-11ea-a2bf-14dda9ec820d', '2012b383-006d-11ea-9dff-14dda9ec820d', 'fb12fb6d-f47d-11e9-a922-f0795939be61', null);
INSERT INTO `userpermission` VALUES ('b34752f6-0a72-11ea-8880-14dda9ec820d', '2d2c6aec-0065-11ea-9dff-14dda9ec820d', 'fb12f7d5-f47d-11e9-a922-f0795939be61', null);
INSERT INTO `userpermission` VALUES ('b347560f-0a72-11ea-8880-14dda9ec820d', '2d2c6aec-0065-11ea-9dff-14dda9ec820d', 'fb12fb6d-f47d-11e9-a922-f0795939be61', null);
INSERT INTO `userpermission` VALUES ('b347572c-0a72-11ea-8880-14dda9ec820d', '2d2c6aec-0065-11ea-9dff-14dda9ec820d', 'fb12f9e5-f47d-11e9-a922-f0795939be61', null);
INSERT INTO `userpermission` VALUES ('b347582a-0a72-11ea-8880-14dda9ec820d', '2d2c6aec-0065-11ea-9dff-14dda9ec820d', 'fb12fda0-f47d-11e9-a922-f0795939be61', null);
INSERT INTO `userpermission` VALUES ('b3475936-0a72-11ea-8880-14dda9ec820d', '2d2c6aec-0065-11ea-9dff-14dda9ec820d', 'fb12fe51-f47d-11e9-a922-f0795939be61', null);
INSERT INTO `userpermission` VALUES ('b3475a3f-0a72-11ea-8880-14dda9ec820d', '2d2c6aec-0065-11ea-9dff-14dda9ec820d', 'fb12ff03-f47d-11e9-a922-f0795939be61', null);
INSERT INTO `userpermission` VALUES ('b3475b45-0a72-11ea-8880-14dda9ec820d', '2d2c6aec-0065-11ea-9dff-14dda9ec820d', 'fb12ffb7-f47d-11e9-a922-f0795939be61', null);
INSERT INTO `userpermission` VALUES ('b3475cb2-0a72-11ea-8880-14dda9ec820d', '2d2c6aec-0065-11ea-9dff-14dda9ec820d', 'fb130072-f47d-11e9-a922-f0795939be61', null);
INSERT INTO `userpermission` VALUES ('b3475da2-0a72-11ea-8880-14dda9ec820d', '2d2c6aec-0065-11ea-9dff-14dda9ec820d', 'fb13016d-f47d-11e9-a922-f0795939be61', null);
