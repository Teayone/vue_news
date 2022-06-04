import { defineStore } from "pinia";
import type { ILoginState } from "./types";
import { checkLogin, getUserInfo } from "@/service/global";
export default defineStore("global", {
  state(): ILoginState {
    return {
      isLogin: false,
      info: null,
    };
  },
  actions: {
    changeIsLogin(bool: boolean) {
      this.isLogin = bool;
    },
    changeInfo(payload: any) {
      this.info = payload;
    },
    // 检测是否登录
    async getCheckLoginAsync() {
      let bool = false;
      const { data: res } = await checkLogin();
      if (+res.code === 0) bool = true;
      this.changeIsLogin(bool);
      return bool;
    },
    // 获取用户信息
    async getUserInfoAsync() {
      const { data: res } = await getUserInfo();
      if (+res.code === 0) {
        this.changeInfo(res.data);
      }
    },
  },
});
