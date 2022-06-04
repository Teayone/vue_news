import { defineStore } from "pinia";
import { Toast } from "vant";
import { getPhoneCode, login as toLogin } from "@/service/login";
import useGlobalStore from "../global/global";
import mitt from "@/mitt";
export default defineStore("login", {
  state() {
    return {};
  },
  actions: {
    async getCode(phone: string) {
      const { data: res } = await getPhoneCode(phone);
      if (+res.code !== 0) {
        Toast("当前网络繁忙，请稍后再试");
        return;
      }
    },
    async login(phone: string, code: string) {
      const globalStore = useGlobalStore();
      const { data: res } = await toLogin(phone, code);
      if (+res.code !== 0) return Toast("登陆失败");
      localStorage.setItem("token", res.token); // 将 token 存到本地
      globalStore.changeIsLogin(true); // 更新全局登陆状态
      globalStore.getUserInfoAsync(); // 获取用户信息
      Toast("登陆成功");
      mitt.emit("login-success");
    },
  },
});
