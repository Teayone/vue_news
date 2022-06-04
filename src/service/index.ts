import XRequest from "./request";
import qs from "qs";
import md5 from "blueimp-md5";
import { isPlainObject } from "@/utils";
export default new XRequest({
  baseURL: "/api",
  timeout: 5000,
  transformRequest: (data) => {
    if (isPlainObject(data)) {
      return qs.stringify(data);
    }
    return data;
  },
  // 携带Token
  interceptors: {
    requestInterceptors(config) {
      // 需要携带 Token 的请求
      const apiList = [
        "/check_login",
        "/user_info",
        "/user_update",
        "/store",
        "/store_remove",
        "/store_list",
      ];
      const token = localStorage.getItem("token");
      if (apiList.includes(config.url as string) && token) {
        let time = +new Date(); // 获取时间戳
        let sign = md5(`${token}@${time}@zhufeng`); // md5 加密

        if (config.headers) {
          if (config.url === "/user_update") {
            config.headers["Content-Type"] = "multipart/form-data";
          }
          config.headers["authorzation"] = token;
          config.headers["time"] = time;
          config.headers["sign"] = sign;
        }
      }

      return config;
    },
  },
});
