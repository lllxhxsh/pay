let result = {
  "pageNum": 1,
  "pageSize": 10,
  "totalPage": 1,
  "total" : 4,
  "list" :[
      {
          "roleId":1,
          "createTime":"2020-02-02 13:23:23",
          "roleName":"账单管理员",
          "description":"可以操作账单列表",
          "enable":1,
          "relationUseCnt":10
      },
      {
          "roleId":7,
          "createTime":"2020-02-15 08:54:07",
          "roleName":"账户管理员",
          "description":"可以操作账户列表",
          "enable":1,
          "relationUseCnt":10
      },
      {
          "roleId":12,
          "createTime":"2020-06-14 18:18:00",
          "roleName":"权限管理员",
          "description":"可以操作权限所有功能",
          "enable":1,
          "relationUseCnt":10
      },
      {
          "roleId":21,
          "createTime":"2020-07-07 08:29:13",
          "roleName":"统计管理员",
          "description":"可以查看统计",
          "enable":1,
          "relationUseCnt":10
      },

  ]
}



export default {
    'get|/admin/queryRole':  option => {
    return {
      code: 200,
      message: '操作成功',
      data: result
    };
  }
}
