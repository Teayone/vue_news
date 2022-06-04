import { RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: () =>
      import(/* webpackChunkName:'detail' */ "@/views/Detail.vue"),
  },
  {
    path: "/login",
    component: () => import(/* webpackChunkName:'login' */ "@/views/Login.vue"),
  },
  {
    path: "/person",
    component: () =>
      import(/* webpackChunkName:'person' */ "@/views/Person.vue"),
  },
  {
    path: "/store",
    component: () => import(/* webpackChunkName:'store' */ "@/views/Store.vue"),
  },
  {
    path: "/updateperson",
    component: () =>
      import(/* webpackChunkName:'updateperson' */ "@/views/UpdatePerson.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/",
  },
];
