import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: 'login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  }, {
    path: '/regist',
    name: 'regist',
    component: () => import('../components/Regist.vue')
  }, {
    path: '/home',
    component: () => import('../views/Home.vue'),
    redirect: '/userlist',
    children: [{
      path: '/userlist',
      name: 'userlist',
      component: () => import('../views/users/UserList.vue')
    }, {
      path: '/userinfo',
      name: 'userinfo',
      component: () => import('../views/users/UserInfo.vue')
    }, {
      path: '/booklist',
      name: 'booklist',
      component: () => import('../views/books/BookList.vue')
    }, {
      path: '/bookinfo',
      name: 'bookinfo',
      component: () => import('../views/books/BookInfo.vue')
    }, {
      path: '/borrowlist',
      name: 'borrowlist',
      component: () => import('../views/borrow/BorrowList.vue')
    }, {
      path: '/borrowadd',
      name: 'borrowadd',
      component: () => import('../views/borrow/BorrowAdd.vue')
    }, {
      path: '/datalist',
      name: 'datalist',
      component: () => import('../views/data/DataList.vue')
    }]

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/regist') return next();
  //获取当前登录状态
  const token = window.sessionStorage.getItem('user');
  if (!token) return next('/login'); //不存在login
  next(); //放行
})

// 重复路由的error捕捉处理
const orininalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(localhost) {
  return orininalPush.call(this, localhost).catch(err => err);
}

export default router
