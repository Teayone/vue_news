import { defineStore } from "pinia";
import { Toast } from "vant";
import {
  getCollectionList,
  removeCollection,
  collection,
} from "@/service/collection";
interface ICollectData {
  data: any[];
}
export default defineStore("collection", {
  state(): ICollectData {
    return {
      data: [],
    };
  },
  actions: {
    changeData(data: []) {
      this.data = data;
    },
    async getCollectionlistAsync() {
      const { data: res } = await getCollectionList();
      if (+res.code !== 0) {
        Toast("获取收藏列表失败");
      } else {
        this.changeData(res.data);
      }
    },
    // 添加收藏
    async addCollectionAsync(newsId: string | number) {
      const { data: res } = await collection(newsId);
      if (+res.code !== 0) {
        Toast.fail("添加收藏失败");
      } else {
        Toast.success("添加收藏成功");
      }
    },
    // 取消收藏
    async removeCollectionAsync(id: string | number) {
      const { data: res } = await removeCollection(id);
      if (+res.code !== 0) {
        Toast.fail("取消收藏失败");
      } else {
        Toast.success("取消收藏成功");
      }
    },
  },
});
