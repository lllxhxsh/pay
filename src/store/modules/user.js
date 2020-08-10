import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken} from '@/utils/auth'
import md5 from 'js-md5';
import { getId, setId } from '../../utils/auth';

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    menuFlag: '0',
    id:getId()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENUFLAG: (state, menuFlag) => {
      state.menuFlag = menuFlag
    },
    SET_ID:(state, id) => {
      state.id = id
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        let scret = md5('eccbc87e4b5ce2fe28308fd9f2a7baf312tt390t9874' + userInfo.password)
        console.log("scret-> "+scret);
        login(username, scret).then(response => {
          console.log(JSON.stringify(response));
          // const data = response.data
          // console.log(JSON.stringify(data));
          const tokenStr = response.jwtToken;
          setToken(tokenStr)
          setId(response.operatorId)
          commit('SET_TOKEN', tokenStr)
          commit('SET_ID', response.operatorId)
          // commit('SET_NAME', data.username)
          // commit('SET_AVATAR', data.icon)
          // commit('SET_ROLES', data.roles)
          commit('SET_MENUFLAG', '0')
          // console.log("dddddddddddddddddd");
          resolve()
        }).catch(error => {
          console.log(error);
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.id).then(response => {
          console.log("getinfo->   "+JSON.stringify(response));
          var acctountMenuList = response.list;
          var menuOneLevelList = [];
          var menuNameList =[];

          if(acctountMenuList!= null&& acctountMenuList.length>0){

            for(let i=0;i< acctountMenuList.length;i++){

                var menuData =  {"frontName": acctountMenuList[i]["frontName"],
                                "hasSubMe  nu":acctountMenuList[i]["hasSubMenu"],
                                "hidden":acctountMenuList[i]["hidden"],
                                "icon":acctountMenuList[i]["icon"],
                                "level":acctountMenuList[i]["level"],
                                "menuId":acctountMenuList[i]["menuId"],
                                "parentId":acctountMenuList[i]["parentId"],
                                "sort":acctountMenuList[i]["sort"],
                                "title":acctountMenuList[i]["title"],
                                };
                menuData["children"] = [];
                var hidden = menuData["hidden"];
                var parentId = menuData["parentId"];
                if (parentId == 0) {
                  menuOneLevelList.push(menuData);
                }
              }

              for(let j = 0 ; j < menuOneLevelList.length; j ++ ){
                var oneLevelData =  menuOneLevelList[j];
                var menuId = oneLevelData["menuId"]
                var tempLevelMenu = [];
                 for(let i=0;i< acctountMenuList.length;i++){
                    var menuData = {"frontName":acctountMenuList[i]["frontName"],
                                "hasSubMenu":acctountMenuList[i]["hasSubMenu"],
                                "hidden":acctountMenuList[i]["hidden"],
                                "icon":acctountMenuList[i]["icon"],
                                "level":acctountMenuList[i]["level"],
                                "menuId":acctountMenuList[i]["menuId"],
                                "parentId":acctountMenuList[i]["parentId"],
                                "sort":acctountMenuList[i]["sort"],
                                "title":acctountMenuList[i]["title"],
                                };
                    menuData["children"] = [];
                    var hidden = menuData["hidden"];
                    var parentId =  menuData["parentId"];
                    if(parentId == menuId){
                      oneLevelData.children.push(menuData)
                      menuNameList.push("/"+oneLevelData.frontName +"/"+menuData.frontName);
                    }
                 }

              }
             console.log(menuNameList);
            response.list = menuNameList;//["/account/accountList","/bill/billList","/monitor/monitorList","/statistics/day","/ums/admin", "/ums/role","/ums/menu","/ums/resource"];
            if (response.list && response.list.length > 0) { // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', response.list)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            commit('SET_NAME', response.operatorName)
            // commit('SET_AVATAR', data.icon)
            commit('SET_MENUFLAG', '1')
            resolve(response)

          }else{
            reject('当前用户没有访问权限')
          }

        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
      //   logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_MENUFLAG', '0')
          removeToken()
          // location.reload()
          resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        commit('SET_ROLES', [])
        commit('SET_MENUFLAG', '0')
        // removeUserName()
        // removeMenu()
        resolve()
      })
    }
  }
}

export default user
