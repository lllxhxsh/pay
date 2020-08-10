let result = {
  "pageNum": 1,
  "pageSize": 10,
  "totalPage": 1,
  "total" : 4,
  "list" :[
      {
          "acctId":1,
          "acctType":1,
          "baseUserId":273867,
          "telephone":15580253738,
          "isRealName":1,
          "acctName":"张三",
          "state":1,
          "amount":100008,
          "cashFreezeAmout":100008

      },
      {
        "acctId":7,
        "acctType":1,
        "baseUserId":273867,
        "telephone":15580253481,
        "isRealName":1,
        "acctName":"李四",
        "state":1,
        "amount":100008,
        "cashFreezeAmout":100008
      },
      {
        "acctId":12,
        "acctType":1,
        "baseUserId":273867,
        "telephone":16358652639,
        "isRealName":1,
        "acctName":"王武",
        "state":1,
        "amount":100008,
        "cashFreezeAmout":100008,

      },
      {
        "acctId":21,
        "acctType":1,
        "baseUserId":273867,
        "telephone":15580873971,
        "isRealName":1,
        "acctName":"赵四",
        "state":1,
        "amount":100008,
        "cashFreezeAmout":100008,
      },

  ]
}

export default {
    'get|/opt/queryAccount':  option => {
    return {
      code: 200,
      message: '操作成功',
      data: result
    };
  }
}
