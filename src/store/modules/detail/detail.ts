import { defineStore } from "pinia";
import { getNewsInfo, getNewsStoreComment, idType } from "@/service/detail";
import type { IDetailState } from "./types";
export default defineStore("detail", {
  state(): IDetailState {
    return {
      comments: 0,
      popularity: 0,
      newsInfo: null,
    };
  },
  actions: {
    setState(data: IDetailState) {
      const { comments, popularity, newsInfo } = data;
      this.newsInfo = Object.freeze(newsInfo);
      this.comments = comments;
      this.popularity = popularity;
    },
    clearState() {
      this.comments = 0;
      this.popularity = 0;
      this.newsInfo = null;
    },
    async getDetailData(id: idType) {
      const { data: infoRes } = await getNewsInfo(id);
      const { data: commentRes } = await getNewsStoreComment(id);
      const obj = {
        newsInfo: infoRes,
        comments: commentRes.comments,
        popularity: commentRes.popularity,
      };
      this.setState(obj);
    },
  },
});
