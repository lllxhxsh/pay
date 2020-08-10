let res_result = {
    "pageNum":1,
    "pageSize":10,
    "totalPage":3,
    "total":28,
    "list":[
        {
            "resId":1,
            "createTime":"2020-02-04T09:04:55.000+0000",
             "resName":"商品品牌管理",
            "url":"/brand/**",
            "description":null,
            "resTypeId":1
        },
        {
            "resId":2,
            "createTime":
            "2020-02-04T09:05:35.000+0000",
            "resName":"商品属性分类管理",
            "url":"/productAttribute/**",
            "description":null,
            "resTypeId":1
        },
        {
            "resId":3,
            "createTime":"2020-02-04T09:06:13.000+0000",
            "resName":"商品属性管理",
            "url":"/productAttribute/**",
            "description":null,
            "resTypeId":1
        },
        {
            "resId":4,
            "createTime":"2020-02-04T09:07:15.000+0000",
            "resName":"商品分类管理",
            "url":"/productCategory/**",
            "description":null,
            "resTypeId":1
        },
        {
            "resId":5,
            "createTime":"2020-02-04T09:09:16.000+0000",
            "resName":"商品管理",
            "url":"/product/**",
            "description":null,
            "resTypeId":1
        },
        {
            "resId":6,
            "createTime":"2020-02-04T09:09:53.000+0000",
            "resName":"商品库存管理",
            "url":"/sku/**",
            "description":null,
            "resTypeId":1
        },
        {
            "resId":8,
            "createTime":"2020-02-05T06:43:37.000+0000",
            "resName":"订单管理",
            "url":"/order/**",
            "description":"",
            "resTypeId":2
        },
        {
            "resId":9,
            "createTime":"2020-02-05T06:44:22.000+0000",
            "resName":" 订单退货申请管理",
            "url":"/returnApply/**",
            "description":"",
            "resTypeId":2
        },
        {
            "resId":10,
            "createTime":"2020-02-05T06:45:08.000+0000",
            "resName":"退货原因管理",
            "url":"/returnReason/**",
            "description":"",
            "categoryId":2
        },
        {
            "resId":11,
            "createTime":"2020-02-05T06:45:43.000+0000",
            "resName":"订单设置管理",
            "url":"/orderSetting/**",
            "description":"",
            "resTypeId":2
        }
    ]
}




export default {
    'get|/admin/queryResource':  option => {
    return {
          code: 200,
          message: '操作成功',
          data: res_result
          };
      }
  }
