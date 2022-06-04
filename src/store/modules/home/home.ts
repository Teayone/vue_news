import { defineStore } from "pinia";
import { getNewsLatest, getNewsBefore } from "@/service/home";
import type { IHome, IHomeData, INewsListData } from "./types";

export default defineStore("home", {
  state(): IHome {
    return {
      today: "",
      bannerList: [],
      newsList: [],
    };
  },
  actions: {
    setState(data: IHomeData) {
      const { date, stories, top_stories } = data;
      this.today = date;
      this.bannerList = Object.freeze(top_stories);
      this.newsList.push(Object.freeze({ date, stories }));
    },
    setNewsList(data: INewsListData) {
      this.newsList.push(Object.freeze(data));
    },
    async getHomeData() {
      const { data: res } = await getNewsLatest();
      this.setState(res);
    },
    async getHomeMoreData(time: string) {
      const { data: res } = await getNewsBefore(time);
      this.setNewsList(res);
    },
  },
});
