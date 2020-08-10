import { asyncRouterMap, constantRouterMap } from '@/router/index';

function checkPermission(parents, menus, route){
  let currMenu = getMenu(parents + route.name, menus);
  let result = false;

  if (route.children && route.children.length > 0) {
    //枝节点
    route.children.forEach((item, index, array)=>{
        if(checkPermission(parents + route.name + '/', menus, item) == true){
          result = true;
        }
    })
  } else {
    //叶节点
    if (currMenu==null) {
      route.hidden = true;
    }
    else{
      //设置菜单的标题、图标和可见性
      if (currMenu.title != null && currMenu.title !== '') {
        route.meta.title = currMenu.title;
      }
      if (currMenu.icon != null && currMenu.title !== '') {
        route.meta.icon = currMenu.icon;
      }
      if(currMenu.hidden!=null){
        route.hidden = currMenu.hidden !== 0;
      }
      if (currMenu.sort != null && currMenu.sort !== '') {
        route.sort = currMenu.sort;
      }
      result = true;
    }
  }

  return result;
}

//根据路由名称获取菜单
function getMenu(name, menus) {
  for (let i = 0; i < menus.length; i++) {
    let menu = menus[i];
    if (name===menu) {
      return menu;
    }
  }
  return null;
}


//对菜单进行排序
function sortRouters(accessedRouters) {
  for (let i = 0; i < accessedRouters.length; i++) {
    let router = accessedRouters[i];
    if(router.children && router.children.length > 0){
      router.children.sort(compare("sort"));
    }
  }
  accessedRouters.sort(compare("sort")); 
}

//降序比较函数
function compare(p){
  return function(m,n){
    let a = m[p];
    let b = n[p];
    return b - a;
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
	  console.log("1111111111111111111111");
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { menus } = data;
        const { username } = data;
        const accessedRouters = asyncRouterMap.filter(v => {
          if (v.name) {
            return checkPermission('/', menus, v);
          } else {
            return true;
          }
        });
        //对菜单进行排序
        sortRouters(accessedRouters);
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
};

export default permission;
