<template>
  <div class="page-login">
    <Nav />
    <Form ref="formBox">
      <CellGroup class="form-content" inset>
        <Field
          v-model="tel"
          type="tel"
          label="手机号"
          required
          maxlength="11"
          placeholder="请输入手机号"
          name="phone"
          :rules="[
            { required: true, message: '请输入手机号' },
            { pattern: TelReg, message: '手机号不合法' },
          ]"
        />
        <Field
          required
          v-model="sms"
          center
          label="短信验证码"
          placeholder="请输入短信验证码"
          name="code"
          :rules="[
            { required: true, message: '请输入验证码' },
            { pattern: codeReg, message: '验证码格式不正确' },
          ]"
        >
          <template #button>
            <Icon
              name="cross"
              class="clear-icon"
              @click="sms = ''"
              v-if="sms !== ''"
            />
            <Button
              size="small"
              type="primary"
              @click="sendCode"
              :disabled="isDisabled"
            >
              {{
                isDisabled
                  ? countDown < 10
                    ? "0" + countDown + "秒后重新发送"
                    : countDown + "秒后重新发送"
                  : "获取验证码"
              }}
            </Button>
          </template>
        </Field>
      </CellGroup>
    </Form>
    <div class="login-btn">
      <Button type="primary" class="login-btn_button" @click="toLogin">
        立即登录/注册
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Form, Field, CellGroup, Button, Icon } from "vant";
import useLoginStore from "@/store/modules/login/login";
import mitt from "@/mitt";
import Nav from "@/components/Nav";
const tel = ref("");
const sms = ref("");
const TelReg = /^1[3-9][0-9]{9}$/;
const codeReg = /^\d{6}$/;
const countDown = ref(60);
const isDisabled = ref(false);
const formBox = ref<any>(null); // 获取 Form 组件
const loginStore = useLoginStore();
const router = useRouter();
const route = useRoute();
// 倒计时
const cd = (timerId: Ref<any>, disabled?: Ref<boolean>) => {
  if (disabled) disabled.value = true;
  // 倒计时没结束，不能再次获取验证码
  timerId.value = setInterval(() => {
    countDown.value = countDown.value - 1;
    if (countDown.value <= 0) {
      clearInterval(timerId.value);
      if (disabled) disabled.value = false;
    }
  }, 1000);
};
// 处理手机号格式正确的逻辑
const getCode = () => {
  const timerId = ref<any>(null);
  // 开启倒计时
  cd(timerId, isDisabled);
  // 发请求获取验证码
  loginStore.getCode(tel.value);
};

// 处理获取验证码按钮点击事件
const sendCode = async () => {
  try {
    // 校验手机格式
    await formBox.value.validate("phone");
    // 格式通过发起请求
    getCode();
  } catch (error) {
    return error;
  }
};
const toLogin = async () => {
  try {
    await formBox.value.validate("code");
    loginStore.login(tel.value, sms.value);
  } catch (error) {
    return error;
  }
};
onMounted(() => {
  mitt.on("login-success", () => {
    let from = route.query.from;
    if (from) {
      router.replace(`/${from}`);
    } else {
      router.replace("/person");
    }
  });
});
</script>

<style scoped lang="less">
.page-login {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/image/login-bg2.jpeg");

  .clear-icon {
    position: relative;
    top: 5px;
    right: 5px;
  }
  .form-content {
    margin-top: 150px;
  }
  .login-btn {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    .login-btn_button {
      width: 300px;
      border-radius: 30px;
    }
  }
}
</style>
