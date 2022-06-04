import xrequest from "../index";

// 获取今日新闻
export function getNewsLatest() {
  return xrequest.get({
    url: "/news_latest",
  });
}

// 获取往日新闻
export function getNewsBefore(time: string) {
  return xrequest.get({
    url: "/news_before",
    params: {
      time,
    },
  });
}
