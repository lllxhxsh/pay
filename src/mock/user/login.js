let result = {
      token: 'abcdefg',
      tokenHead: '12345',
      username:'新新人类',
      icon: 'http://cdn.duitang.com/uploads/item/201507/27/20150727120532_2myZC.thumb.700_0.jpeg',
      roles: ["/ums/admin", "/ums/role"]
    }

export default {
    'post|/admin/login':  option => {
    return {
      code: 200,
      message: '登录成功',
      data: result
    };
  }
}
