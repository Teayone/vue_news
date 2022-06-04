<template>
  <section class="banner-box">
    <Swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      lazy-render
      v-if="props.bannerList.length > 0"
    >
      <swipe-item v-for="item in props.bannerList" :key="item.id">
        <router-link
          :to="{ name: 'detail', params: { id: item.id } }"
          class="content"
        >
          <img :src="item.image" alt="" />
          <div class="mark">
            <h3 class="title">{{ item.title }}</h3>
            <span class="tip">{{ item.hint }}</span>
          </div>
        </router-link>
      </swipe-item>
    </Swipe>
  </section>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import { Swipe, SwipeItem } from "vant";
const props = withDefaults(
  defineProps<{
    bannerList: any[];
  }>(),
  {
    bannerList: () => [],
  }
);
</script>

<style scoped lang="less">
.banner-box {
  box-sizing: border-box;
  height: 375px;
  background-color: #d5d5d5;
  .my-swipe {
    height: 100%;
    background-color: #fff;
    .content {
      position: relative;
      display: block;
      height: 100%;
      color: #fff;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      .mark {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        height: 110px;
        padding: 10px 20px;
        background-color: rgba(0, 0, 0, 0.3);
        background: -webkit-linear-gradient(
          top,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.5)
        );
        .title {
          padding-top: 8px;
          font-size: 20px;
          line-height: 25px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; /* 这里是超出几行省略 */
          overflow: hidden;
        }
        .tip {
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
    :deep(.van-swipe__indicators) {
      left: auto;
      right: 15px;
      transform: none;

      .van-swipe__indicator--active {
        width: 15px;
        border-radius: 3px;
      }
    }
  }
}
</style>
