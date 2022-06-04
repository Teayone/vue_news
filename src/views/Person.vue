<template>
  <div class="page-person">
    <Nav />
    <div class="base-info" v-if="info !== null">
      <img :src="info.pic" alt="" @click="$router.push('/updateperson')" />
      <p>{{ info.name }}</p>
    </div>
    <CellGroup>
      <Cell title="我的收藏" is-link to="/store"></Cell>
    </CellGroup>
    <div class="login-out">
      <Button type="danger" round class="login-out-btn" @click="signOut">
        退出登录
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CellGroup, Cell, Button, Toast } from "vant";
import { storeToRefs } from "pinia";
import useGlobalStore from "@/store/modules/global/global";
import Nav from "@/components/Nav";
import router from "@/router";
const globalStore = useGlobalStore();
const { info } = storeToRefs(globalStore);
// 退出登录
const signOut = () => {
  Toast.success("退出登陆成功");
  localStorage.removeItem("token");
  globalStore.changeIsLogin(false);
  globalStore.changeInfo(null);
  router.replace("/login");
};
</script>

<style scoped lang="less">
.page-person {
  height: 100vh;
  background-color: #fff;
}
.base-info {
  padding: 50px 15px;
  text-align: center;

  box-sizing: border-box;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}
.login-out {
  text-align: center;
  margin-top: 30px;
  .login-out-btn {
    padding: 15px 50px;
  }
}
</style>
