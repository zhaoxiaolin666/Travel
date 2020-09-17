<template>
  <div style="width:100vw;" class="flex j-center bj-f">
    <div class="flex" style="width:70vw;">
      <!-- 左边 -->
      <div style="width:30%;padding-top:20px;z-index:5;" class="position-r">
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
              <!-- 定位的元素 -->
              <div
                class="position-a"
                style="left:336px;top:20px;width:320px;height:210px;"
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
                style="width:1px;height:38px;top:192px;left:335px;background-color:#ccc;"
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
              <div style="margin:0 10px;" class="recommend">{{item.name}}</div>
            </div>
          </div>
        </div>
        <!-- 推荐攻略 -->
        <div class="flex j-between" style="border-bottom:1px solid #ccc;">
          <div
            style="font-size:20px;font-weight:500;color:#ffa500;border-bottom:2px solid #ffa500;padding:10px 0;"
          >推荐攻略</div>
          <div style="padding:10px 0;">
            <a-button type="primary">
              <EditOutlined />写游记
            </a-button>
          </div>
        </div>
        <div>
          <div v-for="(item,index) in Resposts111" :key="index">
            <div class="title">{{item.title}}</div>
            <div class="summary">{{item.summary}}</div>
            <div v-if="item.images.length" class="flex j-between">
              <div
                v-for="(item1,index1) in item.images.splice(0,3)"
                :key="index1"
                style="width:200px;height:150px;"
              >
                <img :src="item1" alt style="width:250px;height:150px;" />
              </div>
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
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      name: "jack",
      resdata: {},
      flag: "-1",
      child: [],
      value: "",
      citys: [{ name: "广州" }, { name: "上海" }, { name: "北京" }],
      Resposts111: []
    });
    const enter = (
      item: RespostscitiesItem,
      index: RespostscitiesItem
    ): void => {
      data.child = item.children!;
      data.flag = index! as string;
      //   console.log(item);
    };
    const leave = (item: RespostscitiesItem): void => {
      data.child = [];
      data.flag = "-1";
    };
    const onSearch = (): void => {
      console.log(111);
    };
    onMounted(() => {
      api
        .getpostscities()
        .then((res: Respostscities) => {
          data.resdata = res.data! as RespostscitiesItem;
          console.log(data.resdata);
        })
        .catch((err: any) => {
          console.log(err);
        });
      api
        .getposts()
        .then((res: Resposts) => {
          data.Resposts111 = res.data! as RespostsItem[];
          console.log(data.Resposts111);
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(data),
      enter,
      leave,
      onSearch
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
  font-size: 20px;
  padding: 15px 0;
}
</style>