import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  createWebHashHistory,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";
import layout from "../views/layout.vue";

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
        },
      },
      {
        path: "/strategy",
        name: "strategy",
        component: () => import("../views/strategy.vue"),
        meta: {
          title: "旅游攻略",
        },
      },
      {
        path: "/hotel",
        name: "hotel",
        component: () => import("../views/hotel.vue"),
        meta: {
          title: "酒店",
        },
      },
      {
        path: "/ticket",
        name: "ticket",
        component: () => import("../views/ticket.vue"),
        meta: {
          title: "国内机票",
        },
        // children: [
        //   {
        //     path: "/ticket/flights",
        //     name: "ticketflights",
        //     component: () => import("../views/air/ticketflights.vue"),
        //     meta: {
        //       title: "机票列表",
        //     },
        //   },
        // ],
      },
      {
        path: "/login",
        name: "login",
        component: () => import("../views/login.vue"),
        meta: {
          title: "登录/注册",
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
