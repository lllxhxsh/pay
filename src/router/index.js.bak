import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'




export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {


    path: '',
    component: Layout,
    redirect: '/home',
    hidden:true,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home', hidden:true},
      hidden:true,
    }]

    // path:'',
    // component: Layout,
    // redirect: '/account/accountList',
    // name: 'account',
    // meta: {title: '账户管理', icon: 'ums'},
    // hidden:true,
    // children: [
    //   {
    //     path: 'accountList',
    //     name: 'accountList',
    //     component: () => import('@/views/account/accountList/index'),
    //     meta: {title: '账户列表', icon: 'ums-admin'},
    //     hidden:true,
    //   }]


    // path:'',
    // component: Layout,
    // redirect: '/ums/admin',
    // name: 'ums',
    // meta: {title: '权限', icon: 'ums'},
    // children: [
    //   {
    //     path: 'admin',
    //     name: 'admin',
    //     component: () => import('@/views/ums/admin/index'),
    //     meta: {title: '用户列表', icon: 'ums-admin'}
    //   }]
  },
]


export const asyncRouterMap = [
  {


    path:'/account',
    component: Layout,
    redirect: '/account/accountList',
    name: 'account',
    meta: {title: '账户管理', icon: 'order'},
    children: [
      {
        path: 'accountList',
        name: 'accountList',
        component: () => import('@/views/account/accountList/index'),
        meta: {title: '账户列表', icon: 'product-list'}
      }]

  },

  {

    path:'/bill',
    component: Layout,
    redirect: '/bill/billList',
    name: 'bill',
    meta: {title: '账单管理', icon: 'ums'},
    children: [
      {
        path: 'billList',
        name: 'billList',
        component: () => import('@/views/bill/billList/index'),
        meta: {title: '账单列表', icon: 'product-attr'}
      }]

  },
  {
    path:'/statistics',
    component: Layout,
    redirect: '/statistics/day',
    name: 'statistics',
    meta: {title: '统计', icon: 'ums'},
    children: [
      {
        path: 'day',
        name: 'day',
        component: () => import('@/views/statistics/day/index'),
        meta: {title: '日统计', icon: 'product-cate'}
      },
      {
        path: 'month',
        name: 'month',
        component: () => import('@/views/ums/role/index'),
        meta: {title: '月统计', icon: 'product-cate'}
      }

    ]
  },
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: '/monitor',
  //   children: [{
  //     path: 'monitor',
  //     name: 'monitor',
  //     component: () => import('@/views/monitor/index'),
  //     meta: {title: '监控', icon: 'ums-admin'}
  //   }]
  // },

  {


    path:'/monitor',
    component: Layout,
    redirect: '/monitor/monitorList',
    name: 'monitor',
    meta: {title: '监控管理', icon: 'sms'},
    children: [
      {
        path: 'monitorList',
        name: 'monitorList',
        component: () => import('@/views/monitor/monitorList/index'),
        meta: {title: '监控', icon: 'sms-flash'}
      }]

  },
  {
    path:'/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: {title: '权限管理', icon: 'ums'},
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: {title: '用户列表', icon: 'ums-admin'}
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/ums/role/index'),
        meta: {title: '角色列表', icon: 'ums-role'}
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ums/menu/index'),
        meta: {title: '菜单列表', icon: 'ums-menu'}
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/ums/resource/index'),
        meta: {title: '资源列表', icon: 'ums-resource'}
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/ums/role/allocMenu'),
        meta: {title: '分配菜单'},
        hidden: true
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('@/views/ums/resource/categoryList'),
        meta: {title: '资源分类'},
        hidden: true
      },
      {
        path: 'menuSetResource',
        name: 'menuSetResource',
        component: () => import('@/views/ums/menu/menuSetResource'),
        meta: {title: '菜单分配资源'},
        hidden: true
      }

      //menuSetResource
    ]
  },

  {path: '*', redirect: '/404', hidden: true}
]



export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
