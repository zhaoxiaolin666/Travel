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
    return service.post("/accounts/register", {
      username,
      nickname,
      captcha,
      password,
    });
  },
  //登录
  postlogin({ username, password }: { username: string; password: string }) {
    return service.post("/accounts/login", {
      username,
      password,
    });
  },
  //推荐机票
  getairssale() {
    return service.get("/airs/sale");
  },

  //机票列表
  getairs({
    departCity,
    departCode,
    destCity,
    destCode,
    departDate,
  }: {
    departCity: string;
    departCode: string;
    destCity: string;
    destCode: string;
    departDate: string;
  }) {
    return service.get(
      `/airs?departCity=${departCity}&departCode=${departCode}&destCity=${destCity}&destCode=${destCode}&departDate=${departDate}`
    );
  },
  //搜索城市
  getcities({ name }: { name: string }) {
    return service.get(`/cities?name=${name}`);
  },
  //城市菜单列表
  getpostscities() {
    return service.get("/posts/cities");
  },
  //文章详情
  getposts({ city }: { city: string }) {
    if (city) {
      return service.get(`/posts?city=${city}`);
    } else {
      return service.get("/posts");
    }
  },
  //文章详情
  getgetpostsdetail({ id }: { id: string }) {
    return service.get(`/posts?id=${id}`);
  },
  //实时机票城市
  getairscity({ name }: { name: string }) {
    return service.get(`/airs/city?name=${name}`);
  },
  //机票列表
  getairslist({
    departCity,
    departCode,
    destCity,
    destCode,
    departDate,
  }: {
    departCity: string;
    departCode: string;
    destCity: string;
    destCode: string;
    departDate: string;
  }) {
    return service.get(
      `/airs?departCity=${departCity}&departCode=${departCode}&destCity=${destCity}&destCode=${destCode}&departDate=${departDate}`
    );
  },
  //酒店详情
  //   gethotels({
  //     id,
  //     city,
  //     price_in,
  //     scenic,
  //     name_contains,
  //     hotellevel,
  //     hoteltype,
  //     hotelbrand,
  //     hotelasset,
  //     enterTime,
  //     person,
  //     _sort,
  //     _limit,
  //     _start,
  //   }: {
  //     id?: number;
  //     city: number;
  //     price_in?: number;
  //     scenic?: number;
  //     name_contains?: string;
  //     hotellevel?: number;
  //     hoteltype?: number;
  //     hotelbrand?: number;
  //     hotelasset?: number;
  //     enterTime?: string;
  //     person?: number;
  //     _sort?: string;
  //     _limit?: number;
  //     _start?: number;
  //   }) {
  //     return service.get(
  //       `/hotels?=${id}&city=${city}&price_in=${price_in}&scenic=${scenic}&name_contains=${name_contains}&hotellevel=${hotellevel}&hoteltype=${hoteltype}&hotelbrand=${hotelbrand}&hotelasset=${hotelasset}&enterTime=${enterTime}&_sort=${_sort}&person=${person}&_limit=${_limit}&_start=${_start}`
  //     );
  //   },
  //酒店详情
  gethotels({ city }: { city: number }) {
    return service.get(`/hotels?city=${city}`);
  },
  //酒店选项
  gethotelsoptions() {
    return service.get("/hotels/options");
  },
};
