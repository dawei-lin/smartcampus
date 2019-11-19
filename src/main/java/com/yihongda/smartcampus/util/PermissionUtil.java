package com.yihongda.smartcampus.util;

import com.yihongda.smartcampus.entity.Permission;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PermissionUtil {
    public static List<Permission> buildPermissionTree(List<Permission> permissionList) {
        List<Permission> newPermissionList = new ArrayList<>();
        Map<String, Permission> hashMap = new HashMap<>();
        if (permissionList != null) {
            for (Permission permission : permissionList) {
                hashMap.put(permission.getId(), permission);
            }
            for (Permission permission : permissionList) {
                Permission parentPermission = hashMap.get(permission.getPid());
                if (parentPermission != null) {
                    if (parentPermission.getChildren() != null) {
                        parentPermission.getChildren().add(permission);
                    } else {
                        List<Permission> children = new ArrayList<>();
                        children.add(permission);
                        parentPermission.setChildren(children);
                    }
                } else {
                    newPermissionList.add(permission);
                }
            }
        }
        for(int i=0;i<newPermissionList.size();i++){
            if(StringUtils.isNotEmpty(newPermissionList.get(i).getPid())){
                newPermissionList.remove(i);
            }
        }
        return newPermissionList;
    }
}
