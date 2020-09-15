import service from "./index";
// if (token) {
//     headers["Authorization"] = 'headers '+token;
//   }
export default {
  // 轮播图
  getbanners() {
    return service.get("scenics/banners");
  },
  //手机验证码
  postcaptchas({ tel }: { tel: string }) {
    return service.post("captchas", { tel });
  },
  //注册
  postregister({
    username,
    nickname,
    captcha,
    password,
  }: {
    username: string;
    nickname: string;
    captcha: string;
    password: string;
  }) {
    return service.post("register", { username, nickname, captcha, password });
  },
};
