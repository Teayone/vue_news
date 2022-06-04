// 刷新获取登陆状态
import useGlobalStore from "@/store/modules/global/global";
export const useGetLoginState = () => {
  const globalStore = useGlobalStore();
  const token = localStorage.getItem("token");
  if (!globalStore.isLogin && token) {
    globalStore.getCheckLoginAsync().then((v) => {
      if (v) {
        globalStore.getUserInfoAsync();
      }
    });
  }
};
