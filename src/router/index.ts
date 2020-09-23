import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  createWebHashHistory,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";
import layout from "../views/layout.vue";
import strategy111 from "../views/strategy111.vue";
import ticket111 from "../views/ticket111.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/home",
    component: layout,
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("../views/Home.vue"),
        meta: {
          title: "首页",
          parentpath: "/home",
        },
      },
      {
        path: "/strategy111",
        name: "strategy111",
        redirect: "/strategy",
        component: strategy111,
        meta: {
          title: "旅游攻略",
          parentpath: "/strategy",
        },
        children: [
          {
            path: "/strategy",
            name: "strategy",
            component: () => import("../views/strategy.vue"),
            meta: {
              title: "旅游攻略",
              parentpath: "/strategy",
            },
          },
          {
            path: "/strategy/create",
            name: "strategycreate",
            component: () => import("../views/strategy/strategycreate.vue"),
            meta: {
              title: "游记",
              parentpath: "/strategy",
            },
          },
          {
            path: "/strategy/deteil",
            name: "strategydeteil",
            component: () => import("../views/strategy/strategydeteil.vue"),
            meta: {
              title: "旅游攻略详情",
              parentpath: "/strategy",
            },
          },
        ],
      },
      {
        path: "/hotel",
        name: "hotel",
        component: () => import("../views/hotel.vue"),
        meta: {
          title: "酒店",
          parentpath: "/hotel",
        },
      },
      {
        path: "/ticket111",
        name: "ticket111",
        component: ticket111,
        meta: {
          title: "国内机票",
          parentpath: "/ticket",
        },
        children: [
          {
            path: "/ticket",
            name: "ticket",
            component: () => import("../views/ticket.vue"),
            meta: {
              title: "国内机票",
              parentpath: "/ticket",
            },
          },
          {
            path: "/ticket/flights",
            name: "ticketflights",
            component: () => import("../views/air/ticketflights.vue"),
            meta: {
              title: "机票列表",
              parentpath: "/ticket",
            },
          },
          {
            path: "/ticket/order",
            name: "ticketorder",
            component: () => import("../views/air/airorder.vue"),
            meta: {
              title: "机票订单",
              parentpath: "/ticket",
            },
          },
        ],
      },
      {
        path: "/login",
        name: "login",
        component: () => import("../views/login.vue"),
        meta: {
          title: "登录/注册",
          parentpath: "/login",
        },
      },
    ],
  },
  //   {
  //     path: "*",
  //     name: "404",
  //     component: () => import("../views/404.vue"),
  //     meta: {
  //       title: "404",
  //       parentpath: "/404",
  //     },
  //   },
];
//决定路由模式
const isPro: boolean = process.env.NODE_ENV === "prodution";

const router = createRouter({
  //history是路由模式(线上线下)
  history: isPro
    ? createWebHashHistory(process.env.BASE_URL)
    : createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    document.title = to.meta.title;
    console.log(from);
    next();
  }
);

export default router;
