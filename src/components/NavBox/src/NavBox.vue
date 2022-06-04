<template>
  <div class="nav-box">
    <Icon name="arrow-left" @click="handle" />
    <Icon name="comment-o" :badge="comments" />
    <Icon name="good-job-o" :badge="popularity" />
    <Icon
      :name="id ? 'star' : 'star-o'"
      color="#1989fa"
      @click="collectionClick"
    />
    <Icon name="share-o" color="#ccc" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from "vue";
import { Icon } from "vant";
import { usePageBack } from "@/hooks/usePageBack";
const porps = withDefaults(
  defineProps<{
    comments: number;
    popularity: number;
    id: string | number;
  }>(),
  {
    comments: 0,
    popularity: 0,
    id: "",
  }
);
const emit = defineEmits(["collectinoClick"]);
const handle = usePageBack();
const collectionClick = () => {
  emit("collectinoClick");
};
</script>

<style scoped lang="less">
.nav-box {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f4f4;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  .van-icon:nth-child(1) {
    position: relative;
    &::after {
      position: absolute;
      top: -10%;
      right: -15px;
      content: "";
      width: 1px;
      height: 120%;
      background-color: #d5d5d5;
    }
  }
  :deep(.van-badge) {
    background-color: transparent;
    border: none;
    color: #000;
    right: -5px;
  }
}
</style>
