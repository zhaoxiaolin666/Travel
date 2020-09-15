<template>
  <div class="flex j-center" style="width:100vw;">
    <div style="width:80vw;" class="flex j-between">
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
      >登录/注册</div>
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
import { useRoute, useRouter } from "vue-router";
interface Nav {
  title: string;
  path: string;
}
interface Data {
  name: string;
  nav: Nav[];
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
      ]
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
</style>