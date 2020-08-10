let result = {
  "pageNum": 1,
  "pageSize": 10,
  "totalPage": 1,
  "total" : 4,
  "list" :[
      {
        "operatorId":1,
        "operatorName":"张三",
        "telephone":13272463481,
        "email":"1095853409@qq.com",
        "enable":1,
        "createTime":"2020-02-02 13:23:23",
        "lasttLoginTime":"2020-07-13 14:56:21",

        "account":"lx_4273",
        "remark":"杨幂",
        "roleId":1,
        "role":"运营专员",

      },
      {
        "operatorId":7,
        "operatorName":"李四",
        "telephone":13272463481,
        "email":"1095853409@qq.com",
        "enable":1,
        "createTime":"2020-02-02 13:23:23",
        "lasttLoginTime":"2020-07-13 14:56:21",

        "account":"lx_4273",
        "remark":"李易峰",
        "roleId":7,
        "role":"管理员",


      },
      {
        "operatorId":12,
        "operatorName":"王武",
        "telephone":13272463481,
        "email":"1095853409@qq.com",
        "enable":1,
        "createTime":"2020-02-02 13:23:23",
        "lasttLoginTime":"2020-07-13 14:56:21",

        "account":"lx_4273",
        "remark":"阳阳",
        "roleId":12,
        "role":"维护专员",

      },
      {
        "operatorId":21,
        "operatorName":"赵四",
        "telephone":13272463481,
        "email":"1095853409@qq.com",
        "enable":1,
        "createTime":"2020-02-02 13:23:23",
        "lasttLoginTime":"2020-07-13 14:56:21",

        "account":"lx_4273",
        "remark":"阳阳",
        "roleId":21,
        "role":"运营专员",

      },

  ]
}

export default {
    'get|/admin/queryUser':  option => {
    return {
      code: 200,
      message: '操作成功',
      data: result
    };
  }
}
