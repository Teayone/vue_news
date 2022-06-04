import xrequest from "../index";
// 检测是否登录(需要请求头携带 Token)
export const checkLogin = () => {
  return xrequest.get({
    url: "/check_login",
  });
};

// 获取登陆者信息(需要请求头携带 Token)
export const getUserInfo = () => {
  return xrequest.get({
    url: "/user_info",
  });
};
