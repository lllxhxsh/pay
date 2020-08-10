let result = {
  "pageNum": 1,
  "pageSize": 10,
  "totalPage": 1,
  "total" : 4,
  "list" :[
      {
        "acctId":273867,
        "acctName":"张三",
        "otherAcctId":273867,
        "otherAcctName":"李四",
        "billTitle":"转账",
        "billIcon":"",
        "direct":1,
        "amount":120098,
        "transType":1,
        "transRelationSn":184747521414138,
        "billTypeCode":1,
        "refundState":1
          
      },
      {
         "acctId":273867,
         "acctName":"张三",
         "otherAcctId":273867,
         "otherAcctName":"李四",
         "billTitle":"转账",
         "billIcon":"",
         "direct":1,
         "amount":120098,
         "transType":1,
         "transRelationSn":184747521414138,
         "billTypeCode":1,
         "refundState":1
      },
      {
         "acctId":273867,
         "acctName":"张三",
         "otherAcctId":273867,
         "otherAcctName":"李四",
         "billTitle":"转账",
         "billIcon":"",
         "direct":1,
         "amount":120098,
         "transType":1,
         "transRelationSn":184747521414138,
         "billTypeCode":1,
         "refundState":1
      },
      {
          "acctId":273867,
          "acctName":"张三",
          "otherAcctId":273867,
          "otherAcctName":"李四",
          "billTitle":"转账",
          "billIcon":"",
          "direct":1,
          "amount":120098,
          "transType":1,
          "transRelationSn":184747521414138,
          "billTypeCode":1,
          "refundState":1
      },

  ]
}


export default {
    'get|/opt/queryBill':  option => {
    return {
      code: 200,
      message: '操作成功',
      data: result
    };
  }
}
