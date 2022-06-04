import xrequest from "../index";
// 收藏
export function collection(newsId: string | number) {
  return xrequest.post({
    url: "/store",
    data: {
      newsId,
    },
  });
}

// 取消收藏
export function removeCollection(id: string | number) {
  return xrequest.get({
    url: "/store_remove",
    params: {
      id,
    },
  });
}

// 获取登录者的收藏列表
export const getCollectionList = () => {
  return xrequest.get({
    url: "/store_list",
  });
};
