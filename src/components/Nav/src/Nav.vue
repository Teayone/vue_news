<template>
  <NavBar
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    :title="title"
  />
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import { NavBar } from "vant";
import { usePageBack } from "../../../hooks/usePageBack";
const onClickLeft = usePageBack();
const props = withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: "",
  }
);
</script>

<style scoped lang="less">
:deep(.van-nav-bar__text) {
  color: #000;
}
:deep(.van-icon) {
  color: #000;
}
</style>
