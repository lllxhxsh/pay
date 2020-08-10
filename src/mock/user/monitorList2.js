let result = {
    "pageNum": 1,
    "pageSize": 2,
    "totalPage": 1,
    "total" : 2,
    "list" :[
        {
            "data0":1,
            "data1":"三九",
            "data2":1,
            "data3":2,
            "data4":3,
        },
        {
            "data0":2,
            "data1":"张新发",
            "data2":3,
            "data3":2,
            "data4":1,
        },
        {
            "data0":3,
            "data1":"五子醉",
            "data2":2,
            "data3":3,
            "data4":1,
        },
        {
            "data0":4,
            "data1":"湘潭铺子",
            "data2":3,
            "data3":1,
            "data4":2,
        },
        {
            "data0":5,
            "data1":"胖哥",
            "data2":4,
            "data3":5,
            "data4":6,
        },
        {
            "data0":6,
            "data1":"口味王",
            "data2":6,
            "data3":5,
            "data4":4,
        },
        {
            "data0":7,
            "data1":"小龙王",
            "data2":4,
            "data3":6,
            "data4":5,
        },
        {
            "data0":8,
            "data1":"宾之郎",
            "data2":5,
            "data3":6,
            "data4":4,
        },
        {
            "data0":9,
            "data1":"友文",
            "data2":5,
            "data3":4,
            "data4":6,
        },
        
    ]
}



export default {
  'get|/monitor/Listdd':  option => {
  return {
        code: 200,
        message: '操作成功',
        data: result
        };
    }
}