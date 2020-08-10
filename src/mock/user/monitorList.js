let result = {
    "pageNum": 1,
    "pageSize": 2,
    "totalPage": 1,
    "total" : 2,
    "list" :[
        {
            "data1":"金额",
            "data2":0,
            "data3":0,
            "data4":0,
            "data5":0,
            "data6":0,
            "data7":0,
            "data8":0,
        },
        {
            "data1":"笔数",
            "data2":0,
            "data3":0,
            "data4":0,
            "data5":0,
            "data6":0,
            "data7":0,
            "data8":0,
        },
        
    ]
}



export default {
  'get|/monitor/list':  option => {
  return {
        code: 200,
        message: '操作成功',
        data: result
        };
    }
}