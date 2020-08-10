let res_result = {
    "pageNum":1,
    "pageSize":10,
    "totalPage":3,
    "total":28,
    "list":[
        {
            "id":1,
            "resTypeId":1,
            "createTime":"2020-02-04T09:04:55.000+0000",
            "title":"商品模块",
            "sort": 1,
        },
        {
            "id":2,
            "resTypeId":2,
            "createTime":"2020-02-04T09:04:55.000+0000",
            "title":"订单模块",
            "sort": 1,
        },
        {
            "id":3,
            "resTypeId":3,
            "createTime":"2020-02-04T09:04:55.000+0000",
            "title":"营销模块",
            "sort": 1,
        },
        {
            "id":4,
            "resTypeId":4,
            "createTime":"2020-02-04T09:04:55.000+0000",
            "title":"权限模块",
            "sort": 1,
        },
        {
            "id":5,
            "resTypeId":5,
            "createTime":"2020-02-04T09:04:55.000+0000",
            "title":"内容模块",
            "sort": 1,
        },
        {
            "id":6,
            "resTypeId":6,
            "createTime":"2020-02-04T09:04:55.000+0000",
            "title":"其他模块",
            "sort": 1,
        }
    ]
}




export default {
    'get|/resourceCategory/list':  option => {
    return {
          code: 200,
          message: '操作成功',
          data: res_result
          };
      }
  }
