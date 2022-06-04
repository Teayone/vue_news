import { useRouter } from "vue-router";
export const usePageBack = () => {
  const router = useRouter();
  return function back() {
    if (router.options.history.state.back === null) {
      console.log(123);

      router.push("/home");
    } else {
      router.back();
    }
  };
};
