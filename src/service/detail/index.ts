import xrequest from "../index";
export type idType = number | string;
export function getNewsInfo(id: idType) {
  return xrequest.get({
    url: "/news_info",
    params: {
      id,
    },
  });
}

export function getNewsStoreComment(id: idType) {
  return xrequest.get({
    url: "/story_extra",
    params: {
      id,
    },
  });
}
