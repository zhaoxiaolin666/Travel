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
            :class="item.path===$route.meta.parentpath ? 'color' : 'hover'"
            @click="clicknav(item)"
          >{{item.title}}</div>
        </div>
      </div>
      <div
        style="padding:0 15px;font-size:16px;cursor:pointer;"
        @click="gotologin"
        class="logins"
        v-if="$store.state.loginhead===''&&$store.state.loginname===''"
      >登录/注册</div>
      <div class="mi" v-else @mouseenter="enter" @mouseleave="leave">
        <img
          :src="`http://157.122.54.189:9095${$store.state.loginhead}`"
          alt
          style="width:30px;height:30px;"
        />
        <span>{{$store.state.loginname}}</span>
        <span>
          <CaretDownOutlined />
        </span>
        <div class="position-r" style="z-index:10;top:-10px;border:1px solid #eee;" v-if="flaghead">
          <a-dropdown>
            <a-menu>
              <a-menu-item @click="Personal">个人中心</a-menu-item>
              <a-menu-item @click="signout">退出登录</a-menu-item>
            </a-menu>
          </a-dropdown>
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
  onMounted,
  watchEffect
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { Userregister } from "../types/index";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
interface Nav {
  title: string;
  path: string;
}
interface Data {
  name: string;
  nav: Nav[];
  user: Userregister;
  flag: boolean;
  flaghead: boolean;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const data: Data = reactive<Data>({
      name: "jack",
      nav: [
        { title: "首页", path: "/home" },
        { title: "旅游攻略", path: "/strategy" },
        { title: "酒店", path: "/hotel" },
        { title: "国内机票", path: "/ticket" }
      ],
      user: {},
      flag: false,
      flaghead: false
    });
    // 跳转页面
    const clicknav = (item: any): void => {
      router.push(`${item.path}`);
      //   console.log(item);
    };
    // 跳转登录页
    const gotologin = (): void => {
      router.push("/login");
    };
    // 鼠标移入
    const enter = (): void => {
      data.flaghead = true;
    };
    // 鼠标移出
    const leave = (): void => {
      data.flaghead = false;
    };
    // 个人主页
    const Personal = (): void => {
      message.warning("个人主页暂未开通,敬请期待");
    };
    // 退出登录
    const signout = (): void => {
      data.flaghead = false;
      localStorage.removeItem("user");
      store.commit("setname", {
        name: "",
        head: ""
      });
    };
    onMounted(() => {
      // 是否登录展示
      if (localStorage.getItem("user")) {
        data.user = JSON.parse(localStorage.getItem("user")!);
        store.commit("setname", {
          name: data.user.nickname!,
          head: data.user.defaultAvatar!
        });
      } else {
        store.commit("setname", {
          name: "",
          head: ""
        });
      }
    });
    return {
      ...toRefs(data),
      clicknav,
      gotologin,
      enter,
      leave,
      Personal,
      signout
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