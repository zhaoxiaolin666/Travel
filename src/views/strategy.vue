<template>
  <div style="width:100vw;" class="flex j-center bj-f">
    <div class="flex" style="width:70vw;">
      <!-- 左边 -->
      <div style="width:30%;padding:20px 0;z-index:5;" class="position-r">
        <div style="border-top:1px solid #ccc;border-left:1px solid #ccc;">
          <div v-for="(item,index) in resdata" :key="index">
            <div
              class="flex j-between"
              style="padding:10px 20px;border-bottom:1px solid #ccc;"
              :class="flag===index? 'color' : 'color1'"
              @mouseenter="enter(item,index)"
              @mouseleave="leave(item)"
            >
              <div>{{item.type}}</div>
              <div>
                <RightOutlined />
              </div>
              <!-- 定位的子元素 -->
              <div
                class="position-a"
                style="left:336px;top:20px;width:320px;"
                :class="flag===index? 'borders':''"
                v-if="flag===index"
              >
                <div v-for="(item1,index1) in child" :key="index1">
                  <div style="padding:2px 0;background:#fff;">
                    <span style="font-size:24px;font-weight:500px;margin:0 10px;">{{index1+1}}</span>
                    <span class="city">{{item1.city}}</span>
                    <span style="color:#999;margin-left:10px;" class="city">{{item1.desc}}</span>
                  </div>
                </div>
              </div>
              <div
                class="position-a"
                style="width:1px;height:35px;top:192px;left:335px;background-color:#ccc;"
                v-if="flag===index"
              ></div>
            </div>
          </div>
        </div>
        <div style="font-size:20px;padding:10px 0;border-bottom:1px solid #ccc;width:100%;">推荐城市</div>
        <div>
          <img src="../assets/pic_sea.jpeg" alt style="height:200px;width:336px;margin-top:10px;" />
        </div>
      </div>
      <!-- 右边 -->
      <div style="padding-top:20px;margin-left:50px;">
        <!-- 搜索 -->
        <div style="width:750px;">
          <a-input-search
            v-model:value="value"
            placeholder="请输入想去的地方，比如：‘广州’"
            size="large"
            @search="onSearch"
          />
        </div>
        <!-- 推荐城市 -->
        <div class="flex" style="padding:10px 0;">
          <div>推荐:</div>
          <div class="flex">
            <div v-for="(item,index) in citys" :key="index">
              <div style="margin:0 10px;" class="recommend" @click="gotocity(item)">{{item.name}}</div>
            </div>
          </div>
        </div>
        <!-- 推荐攻略 -->
        <div class="flex j-between" style="border-bottom:1px solid #ccc;">
          <div
            style="font-size:20px;font-weight:500;color:#ffa500;border-bottom:2px solid #ffa500;padding:10px 0;"
          >推荐攻略</div>
          <div style="padding:10px 0;">
            <a-button type="primary" @click="gotocreate">
              <EditOutlined />写游记
            </a-button>
          </div>
        </div>
        <div>
          <div
            v-for="(item,index) in Resposts111"
            :key="index"
            style="border-bottom:1px solid #ccc;margin-bottom:10px;"
            @click="postdetail(item)"
          >
            <div :class="item.images.length===1? 'dis':''">
              <div :class="item.images.length===1? 'dis111':''">
                <div class="title">{{item.title}}</div>
                <div class="summary" style>{{item.summary}}</div>
              </div>
              <div v-if="item.images.length" :class="item.images.length===2? 'photo2' : 'photo1'">
                <div
                  v-for="(item1,index1) in item.images.splice(0,3)"
                  :key="index1"
                  style="width:200px;height:150px;"
                >
                  <img
                    :src="item1"
                    alt
                    style="flex:1;width:100%;height:150px;padding:10px 10px 10px 0;"
                  />
                </div>
              </div>
            </div>
            <div class="flex j-between">
              <div class="flex111">
                <div style="height:14px;width:14px;">
                  <EnvironmentOutlined />
                </div>
                <div>{{item.cityName}}</div>
                <div>by</div>
                <div>
                  <img
                    :src="`http://157.122.54.189:9095${item.account.defaultAvatar}`"
                    style="height:14px;width:14px;"
                  />
                </div>
                <div>{{item.account.nickname}}</div>
                <div style="height:14px;width:14px;">
                  <EyeOutlined />
                </div>
                <div>{{item.watch}}</div>
              </div>
              <div style="color:#ffa500">{{item.watch}}赞</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted
} from "vue";
import {
  Respostscities,
  RespostscitiesItem,
  childrenItem,
  Resposts,
  RespostsItem
} from "../types/index";
import api from "../http/api";
import child from "@/components/child.vue";
import { useRoute, useRouter } from "vue-router";
interface Citysname {
  name: string;
}
interface Data {
  name: string;
  resdata: RespostscitiesItem;
  flag: string;
  child: childrenItem[];
  value: string;
  citys: Citysname[];
  Resposts111: RespostsItem[];
  number: number;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const route = useRoute();
    const router = useRouter();
    const data: Data = reactive<Data>({
      name: "jack",
      resdata: {},
      flag: "-1",
      child: [],
      value: "",
      citys: [{ name: "广州" }, { name: "上海" }, { name: "北京" }],
      Resposts111: [],
      number: 0
    });
    //移入
    const enter = (
      item: RespostscitiesItem,
      index: RespostscitiesItem
    ): void => {
      data.child = item.children!;
      data.flag = index! as string;
      //   console.log(item);
    };
    //移出
    const leave = (item: RespostscitiesItem): void => {
      data.child = [];
      data.flag = "-1";
    };

    //跳转旅游攻略详情
    const postdetail = (item: RespostsItem): void => {
      router.push({ path: "/strategy/deteil", query: { id: item.id } });
      console.log(item.id);
    };
    //城市菜单列表
    const getpostscities = (): void => {
      api
        .getpostscities()
        .then((res: Respostscities) => {
          data.resdata = res.data! as RespostscitiesItem;
          console.log(data.resdata);
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    //文章详情
    const getposts = (): void => {
      api
        .getposts({ city: data.value })
        .then((res: Resposts) => {
          data.Resposts111 = res.data! as RespostsItem[];
          console.log(data.Resposts111);
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    //更改城市
    const gotocity = (item: Citysname): void => {
      data.value = item.name;
      console.log(data.value);
      if (data.value !== "") {
        getposts();
      }
    };
    //搜索
    const onSearch = (value: any): void => {
      console.log(value);
      data.value = value!;
      getposts();
    };
    //跳转写游记
    const gotocreate = (): void => {
      router.push("/strategy/create");
    };
    onMounted(() => {
      getpostscities();
      getposts();
    });
    return {
      ...toRefs(data),
      enter,
      leave,
      onSearch,
      postdetail,
      route,
      router,
      getpostscities,
      getposts,
      gotocity,
      gotocreate
    };
  }
});
</script>

<style scoped lang='scss'>
.color {
  color: #ffa500;
}
.color1 {
  border-right: 1px solid #ccc;
}
.city:hover {
  text-decoration: underline;
  cursor: pointer;
}
.borders {
  border: 1px solid #ccc;
  border-left: none;
}
.recommend:hover {
  text-decoration: underline;
  cursor: pointer;
}
.summary {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.title {
  width: 100%;
  font-size: 18px;
  padding: 15px 0;
}
.title:hover {
  color: #ffa500;
  cursor: default;
}
.dis {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.dis111 {
  padding: 15px;
}
.photo1 {
  display: flex;
  justify-content: space-between;
}
.photo2 {
  display: flex;
}
.flex111 {
  display: flex;
  div {
    margin-right: 5px;
  }
}
</style>