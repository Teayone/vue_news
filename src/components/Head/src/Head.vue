<template>
  <header class="header-box">
    <div class="left">
      <div class="time">
        <span>{{ timeNow.day }}</span>
        <span>{{ timeNow.month }}</span>
      </div>
      <h1 class="title">知乎日报</h1>
    </div>

    <router-link to="/person" class="link-btn">
      <img :src="info ? (info.pic ? info.pic : picUrl) : picUrl" alt="" />
    </router-link>
  </header>
</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults, computed } from "vue";
import { formatTime } from "@/utils";
import useGlobalStore from "@/store/modules/global/global";
import { storeToRefs } from "pinia";

const picUrl = ref(require("@/assets/image/timg.jpg"));
const globalStore = useGlobalStore();
const props = withDefaults(
  defineProps<{
    time?: string;
  }>(),
  {
    time: "",
  }
);
let timeNow = computed(() => {
  let time: any = props.time || null;
  let [month, day] = formatTime(time, "{1}-{2}").split("-");
  const area = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ];
  return {
    month: area[parseInt(month) - 1],
    day,
  };
});
const { info } = storeToRefs(globalStore);
</script>

<style scoped lang="less">
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  height: 35px;
  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .time {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-right: 15px;
      border-right: 1px solid #ddd;
      span {
        white-space: nowrap;
      }
      span:nth-child(1) {
        height: 20px;
        line-height: 20px;
        font-size: 20px;
      }
      span:nth-child(2) {
        height: 15px;
        line-height: 15px;
        font-size: 12px;
      }
    }
    .title {
      font-size: 22px;
      padding-left: 10px;
      white-space: nowrap;
    }
  }
  .link-btn {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    img {
      display: block;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
