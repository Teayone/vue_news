import xrequest from "../index";
// 修改用户名和头像
export const userUpdate = (username: string, file: any) => {
  let fm = new FormData();
  fm.append("username", username);
  fm.append("file", file);

  return xrequest.post({
    url: "/user_update",
    data: fm,
  });
};
