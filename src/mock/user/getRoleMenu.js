let role_result = [
        {
            "id":1,
            "parentId":0,
            "createTime":"2020-02-02T06:50:36.000+0000",
            "title":"商品",
            "level":0,
            "sort":0,
            "name":"pms",
            "icon":"product",
            "hidden":0
        },
        {
            "id":2,
            "parentId":1,
            "createTime":"2020-02-02T06:51:50.000+0000",
            "title":"商品列表",
            "level":1,
            "sort":0,
            "name":"product",
            "icon":"product-list",
            "hidden":0
        },
        {
            "id":3,
            "parentId":1,
            "createTime":"2020-02-02T06:52:44.000+0000",
            "title":"添加商品",
            "level":1,
            "sort":0,
            "name":"addProduct",
            "icon":"product-add",
            "hidden":0
        },
        {
            "id":4,
            "parentId":1,
            "createTime":"2020-02-02T06:53:51.000+0000",
            "title":"商品分类",
            "level":1,
            "sort":0,
            "name":"productCate",
            "icon":"product-cate",
            "hidden":0
        },
        {
            "id":5,
            "parentId":1,
            "createTime":"2020-02-02T06:54:51.000+0000",
            "title":"商品类型",
            "level":1,
            "sort":0,
            "name":"productAttr",
            "icon":"product-attr",
            "hidden":0
        },
        {
            "id":6,
            "parentId":1,
            "createTime":"2020-02-02T06:56:29.000+0000",
            "title":"品牌管理",
            "level":1,
            "sort":0,
            "name":"brand",
            "icon":"product-brand",
            "hidden":0
        }
    ]


export default {
    'get|/role/listMenu':  option => {
    return {
      code: 200,
      message: '操作成功',
      data: role_result
    };
  }
}