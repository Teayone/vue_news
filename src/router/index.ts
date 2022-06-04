import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";
import { Toast } from "vant";
import useGlobalStore from "@/store/modules/global/global";
let pathList = ["/person", "/updateperson", "/store"];
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
// 根据登陆状态决定跳转到什么页面
router.beforeEach(async (to, from, next) => {
  let token = localStorage.getItem("token");
  const globalStore = useGlobalStore();
  if (token && !globalStore.isLogin) {
    const res = await globalStore.getCheckLoginAsync();
    if (res) {
      await globalStore.getUserInfoAsync();
    }
  }
  if (pathList.includes(to.path)) {
    if (!globalStore.isLogin) {
      Toast("请先进行登录");
      next("/login");
    }
  }
  next();
});

export default router;
