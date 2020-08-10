let role_result = {
  "pageNum": 1,
  "pageSize": 10,
  "totalPage": 1,
  "total" : 4,
  "list" :[
      {
          "id":1,
          "createTime":"2020-02-02 13:23:23",
          "name":"账单管理员",
          "decs":"可以操作账单列表",
          "state":1
      },
      {
          "id":7,
          "createTime":"2020-02-15 08:54:07",
          "name":"账户管理员",
          "decs":"可以操作账户列表",
          "state":1
      }

  ]
}


export default {
    'get|/admin/role':  option => {
    return {
      code: 200,
      message: '操作成功',
      data: role_result
    };
  }
}