<template>
  <div class="page-update_person">
    <Nav />
    <Form @submit="onSubmit" ref="formBox">
      <CellGroup>
        <Field
          name="username"
          label="用户名"
          v-model="nicName"
          placeholder="请输入用户名"
          :rules="[
            { required: true, message: '请输入用户名' },
            { pattern: nickNameReg, message: '请输入合法的用户名' },
          ]"
        ></Field>
        <Field label="上传头像">
          <template #input>
            <Uploader v-model="file" :max-count="1" />
          </template>
        </Field>
      </CellGroup>
      <div class="submit">
        <Button
          type="primary"
          native-type="submit"
          class="submit-btn"
          round
          :loading="btnLoading"
        >
          提交
        </Button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import {
  Form,
  CellGroup,
  Field,
  Uploader,
  UploaderFileListItem,
  Button,
  Toast,
} from "vant";
import useGlobalStore from "@/store/modules/global/global";
import useUpdatePersonStore from "@/store/modules/update-person/update-person";
import Nav from "@/components/Nav";
const router = useRouter();
const globalStore = useGlobalStore();
const personStore = useUpdatePersonStore();
const formBox = ref<any>(null);
const nicName = ref(globalStore.info?.name);
const nickNameReg = /^[a-zA-Z0-9\u4E00-\u9FA5]+$/;
const file = ref<UploaderFileListItem[]>([]);
const btnLoading = ref(false);
const onSubmit = (values: any) => {
  if (file.value.length === 0) {
    Toast("请选择一张图片");
    return;
  }
  btnLoading.value = true;
  // 提交数据给服务器
  personStore.update(values.username, file.value[0].file).then((v) => {
    btnLoading.value = false;
    Toast("修改信息成功");
    globalStore.changeInfo(v);
    router.replace("/person");
  });
};
watch(
  () => globalStore.info,
  (newVal) => {
    if (newVal !== null) {
      nicName.value = newVal.name;
    }
  }
);
</script>

<style scoped lang="less">
.page-update_person {
  height: 100vh;
  background-color: #fff;
  .submit {
    margin-top: 20px;
    text-align: center;
    .submit-btn {
      padding: 15px 60px;
    }
  }
}
</style>
