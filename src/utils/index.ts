// 检测是否是纯对象
export const isPlainObject = (obj: any) => {
  let proto, Ctor;
  if (!obj || Object.prototype.toString.call(obj) !== "[object Object]")
    return false;
  proto = Object.getPrototypeOf(obj);
  if (!proto) return true;
  Ctor = proto.hasOwnProperty("constructor") && proto.constructor;
  return typeof Ctor === "function" && Ctor === Object;
};

// 处理最大宽度
export const handleMaxWidth = () => {
  let HTML = document.documentElement,
    app = document.querySelector("#app") as HTMLElement,
    size = parseFloat(HTML.style.fontSize);

  // 视口宽度最大 750
  if (size >= 75) {
    HTML.style.fontSize = "75px";
    app.style.width = "750px";
    return;
  }
  // 如果从 750 切换回小屏幕则设置宽度为100%
  app.style.width = "100%";
};

// 日期格式化
export const formatTime = (time?: string | null, template?: string) => {
  if (typeof time !== "string") {
    time = new Date().toLocaleString("zh-CN", { hour12: false });
  }
  if (typeof template !== "string") {
    template = "{0}年{1}月{2日} {3}:{4}:{5}";
  }
  // 解析出年月日等信息
  let arr: any[] = [];
  // 匹配 20220601 这种连续 8 位数字
  if (/^\d{8}$/.test(time)) {
    let execArr = /^(\d{4})(\d{2})(\d{2})$/.exec(time);
    if (execArr) {
      arr.push(execArr[1], execArr[2], execArr[3]);
    }
  } else {
    // 匹配字符串中的所有数字
    let matchArr = time.match(/\d+/g);
    if (matchArr) {
      arr = matchArr;
    }
  }
  // 把获取的数字替换模板
  return template.replace(/\{(\d+)\}/g, (_, $1) => {
    let item = arr[$1] || "00";
    if (item.lengt < 2) {
      item = "0" + item;
    }
    return item;
  });
};
