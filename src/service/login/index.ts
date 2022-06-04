import xrequest from "../index";
// 登录
export const login = (phone: string, code: string) => {
  return xrequest.post({
    url: "/login",
    data: {
      phone,
      code,
    },
  });
};

// 获取手机验证码
export const getPhoneCode = (phone: string) => {
  return xrequest.post({
    url: "/phone_code",
    data: {
      phone,
    },
  });
};
