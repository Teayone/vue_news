import { defineStore } from "pinia";
import { userUpdate } from "@/service/update-person";
import { Toast } from "vant";
export default defineStore("update-person", {
  state() {
    return {};
  },
  actions: {
    async update(username: string, file: any) {
      const { data: res } = await userUpdate(username, file);
      if (+res.code !== 0) {
        Toast("修改失败，请重新再试");
        return;
      }
      return res.data;
    },
  },
});
