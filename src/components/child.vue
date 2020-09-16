<template>
  <div class="flex j-center" style="width:100vw;">
    <div style="width:70vw;" class="flex j-between">
      <div class="flex">
        <div>
          <img src="../assets/logo.jpg" style="height:60px;" />
        </div>
        <div class="flex c-pointer" style="color:#111;">
          <div
            v-for="(item,index) in nav"
            :key="index"
            style="padding:0 15px;font-size:18px;"
            :class="item.path===$route.path ? 'color' : 'hover'"
            @click="clicknav(item)"
          >{{item.title}}</div>
        </div>
      </div>
      <div
        style="padding:0 15px;font-size:16px;cursor:pointer;"
        @click="gotologin"
        class="logins"
        v-if="!flag"
      >登录/注册</div>
      <div v-else class="mi">
        <img
          :src="`http://157.122.54.189:9095${user.defaultAvatar}`"
          alt
          style="width:30px;height:30px;"
        />
        <span>{{user.nickname}}</span>
        <span>
          <CaretDownOutlined />
        </span>
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
  onMounted,
  watchEffect
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { Userregister } from "../types/index";
interface Nav {
  title: string;
  path: string;
}
interface Data {
  name: string;
  nav: Nav[];
  user: Userregister;
  flag: boolean;
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
      nav: [
        { title: "首页", path: "/home" },
        { title: "旅游攻略", path: "/strategy" },
        { title: "酒店", path: "/hotel" },
        { title: "国内机票", path: "/ticket" }
      ],
      user: {},
      flag: false
    });
    const clicknav = (item: any): void => {
      router.push(`${item.path}`);
      //   console.log(item);
    };
    const gotologin = (): void => {
      router.push("/login");
    };
    onMounted(() => {
      console.log(route.path);
      if (localStorage.getItem("user")) {
        data.user = JSON.parse(localStorage.getItem("user")!);
        data.flag = true;
      } else {
        data.flag = false;
      }
    });
    return {
      ...toRefs(data),
      clicknav,
      gotologin
    };
  }
});
</script>

<style scoped lang='scss'>
.color {
  background-color: skyblue;
  color: #fff;
}
.hover:hover {
  border-bottom: 3px solid skyblue;
  color: skyblue;
}
.logins:hover {
  color: skyblue;
  text-decoration: underline;
}
.mi {
  cursor: pointer;
}
.mi:hover img {
  border: 2px solid #ccc;
  border-radius: 50%;
}
</style>