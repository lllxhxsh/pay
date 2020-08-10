let result = {
    "pageNum": 1,
    "pageSize": 4,
    "totalPage": 1,
    "total" : 4,
    "list" :[
        {
            "stDate":"2020-02-02T06:50:36.000+0000",
            "acctId":0,
            "entryAmount":0,
            "entryCnt":1,
            "outAmount":0,
            "outCnt":0,
            "busAmount":0,
            "busCnt":0,
            "refundAmount":0,
            "refundCnt":0,
            "transferAmount":0,
            "transferCnt":0,
            "rechargeAmount":0,
            "rechargeCnt":0,
            "settlementAmount":0,
            "settlementCnt":0,
            "createTime":0,
        },
        {
            "stDate":"2020-02-02T08:54:07.000+0000",
            "acctId":0,
            "entryAmount":0,
            "entryCnt":1,
            "outAmount":0,
            "outCnt":0,
            "busAmount":0,
            "busCnt":0,
            "refundAmount":0,
            "refundCnt":0,
            "transferAmount":0,
            "transferCnt":0,
            "rechargeAmount":0,
            "rechargeCnt":0,
            "settlementAmount":0,
            "settlementCnt":0,
            "createTime":0,
        },
        {
            "stDate":"2020-02-04T08:18:00.000+0000",
            "acctId":0,
            "entryAmount":0,
            "entryCnt":1,
            "outAmount":0,
            "outCnt":0,
            "busAmount":0,
            "busCnt":0,
            "refundAmount":0,
            "refundCnt":0,
            "transferAmount":0,
            "transferCnt":0,
            "rechargeAmount":0,
            "rechargeCnt":0,
            "settlementAmount":0,
            "settlementCnt":0,
            "createTime":0,
        },
        {
            "stDate":"2020-02-07T08:29:13.000+0000",
            "acctId":0,
            "entryAmount":0,
            "entryCnt":1,
            "outAmount":0,
            "outCnt":0,
            "busAmount":0,
            "busCnt":0,
            "refundAmount":0,
            "refundCnt":0,
            "transferAmount":0,
            "transferCnt":0,
            "rechargeAmount":0,
            "rechargeCnt":0,
            "settlementAmount":0,
            "settlementCnt":0,
            "createTime":0,
        },
        
    ]
}



export default {
  'get|/statistics/list':  option => {
  return {
        code: 200,
        message: '操作成功',
        data: result
        };
    }
}



