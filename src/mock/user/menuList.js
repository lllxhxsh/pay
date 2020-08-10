let result = {
    "pageNum": 1,
    "pageSize": 4,
    "totalPage": 1,
    "total" : 4,
    "list" :[
        {
            "menuId":1,
            "parentId":0,
            "createTime":"2020-02-02T06:50:36.000+0000",
            "title":"商品",
            "level":0,
            "sort":0,
            "frontName":"pms",
            "icon":"product",
            "hidden":0
        },  
        {
            "menuId":7,
            "parentId":0,
            "createTime":"2020-02-02T08:54:07.000+0000",
            "title":"订单",
            "level":0,
            "sort":0,
            "frontName":"oms",
            "icon":"order",
            "hidden":0
        },
        {
            "menuId":12,
            "parentId":0,
            "createTime":"2020-02-04T08:18:00.000+0000",
            "title":"营销",
            "level":0,
            "sort":0,
            "frontName":"sms",
            "icon":"sms",
            "hidden":0
        },
        {
            "menuId":21,
            "parentId":0,
            "createTime":"2020-02-07T08:29:13.000+0000",
            "title":"权限",
            "level":0,
            "sort":0,
            "frontName":"ums",
            "icon":"ums",
            "hidden":0
        },
        
    ]
}



export default {
  'get|/menu/list':  option => {
  return {
        code: 200,
        message: '操作成功',
        data: result
        };
    }
}



