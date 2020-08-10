let result = {
      username:'新新人类',
      icon: 'http://cdn.duitang.com/uploads/item/201507/27/20150727120532_2myZC.thumb.700_0.jpeg',
      roles: ["/monitor/monitor","/statistics/day","/ums/admin", "/ums/role","/ums/menu","/ums/resource"]

    }

export default {
    'post|/admin/info':  option => {
    return {
      code: 200,
      message: '操作成功',
      data: result
    };
  }
}
